<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button/>
                </ion-buttons>
                <ion-title>Camera</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Camera</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- Camera -->
            <div>
                <!-- Gallery -->
                <ion-grid>
                    <ion-row>
                        <ion-col
                            v-for="photo in store.state.Camera.photos"
                            :key="photo.filepath"
                            size="6"
                        >
                            <div class="photo-container">
                                <template v-if="photo.webviewPath">
                                    <ion-img :src="photo.webviewPath"/>
                                </template>
                                <ion-icon
                                    :icon="trash"
                                    size="small"
                                    color="danger"
                                    @click="showActionSheet(photo)"
                                    class="btn-delete"
                                />
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>

                <!-- Take Photo Button -->
                <ion-fab vertical="bottom" horizontal="center" slot="fixed" @click="takePhoto" style="position: fixed">
                    <ion-fab-button color="light">
                        <ion-icon :icon="camera"/>
                    </ion-fab-button>
                </ion-fab>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
    // Reference: https://www.youtube.com/watch?v=3Cy5W_fpQSA
    import {
        actionSheetController,
        IonBackButton,
        IonButtons,
        IonButton,
        IonCol,
        IonContent,
        IonFab,
        IonFabButton,
        IonGrid,
        IonHeader,
        IonIcon,
        IonImg,
        IonPage,
        IonRow,
        IonTitle,
        IonToolbar,
        onIonViewDidEnter
    } from '@ionic/vue';
    import {useStore} from "vuex";
    import {camera, trash, close} from 'ionicons/icons';
    import {Camera, CameraResultType, Photo} from '@capacitor/camera';
    import {Directory, Filesystem} from '@capacitor/filesystem';
    import {Storage} from '@ionic/storage';
    import {PhotoArrayType, PhotoType} from "@/types/Camera.type";

    // hooks
    const store = useStore();

    // constants
    const PHOTO_STORAGE = 'photos';

    // takePhoto method
    const takePhoto = async () => {
        // take photo using Camera
        const cameraPhoto = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });

        // initialize fileName
        const fileName = `${new Date().getTime()}.jpeg`;

        // save the photo
        const savedFileImage: PhotoType = await savePhoto(cameraPhoto, fileName);

        // prepend savedFileImage to photos
        store.commit('prependCameraPhoto', savedFileImage);

        // cache photos
        await cachePhotos();
    };

    // helper: convertBlobToBase64
    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    // savePhoto method
    const savePhoto = async (photo: Photo, fileName: string): Promise<PhotoType> => {
        let base64Data: string;

        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        base64Data = await convertBlobToBase64(blob) as string;

        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
        });

        return {
            filepath: fileName,
            webviewPath: photo.webPath
        }
    };

    const deletePhoto = async (photo: PhotoType) => {
        // delete photo from array
        store.commit('deleteCameraPhoto', photo);

        // delete photo from file system
        const filename = photo.filepath.substring(photo.filepath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Data
        });

        // cache photos
        await cachePhotos();
    };

    // showActionSheet method
    const showActionSheet = async (photo: PhotoType) => {
        const actionSheet = await actionSheetController.create({
            header: 'Photo',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: trash,
                    handler: () => {
                        deletePhoto(photo);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: close,
                    handler: () => {
                        // do nothing
                    }
                }
            ]
        });

        await actionSheet.present();
    };

    // cachePhotos method
    const cachePhotos = async () => {
        const storage = new Storage();
        await storage.create();
        await storage.set(PHOTO_STORAGE, JSON.stringify(store.state.Camera.photos));
    };

    // loadSavedPhotos method
    const loadSavedPhotos = async () => {
        const storage = new Storage();
        await storage.create();
        const photoList = await storage.get(PHOTO_STORAGE);
        const photosInStorage: PhotoArrayType = photoList ? JSON.parse(photoList) : [];

        for(const photo of photosInStorage) {
            const file = await Filesystem.readFile({
                path: photo.filepath,
                directory: Directory.Data
            });

            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            store.commit('appendCameraPhoto', photo);
        }
    };

    // lifecycle hooks
    onIonViewDidEnter(async () => {
        if(store.getters['totalCameraPhotos'] <= 0)
            await loadSavedPhotos();
    });
</script>


<style scoped>
    .photo-container {
        position: relative;
        overflow: hidden;
        border-radius: 4px;
    }

    .photo-container > .btn-delete {
        position: absolute;
        top: 2px;
        right: 1px;
        z-index: 1;
    }
</style>
