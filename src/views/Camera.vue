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
            <div class="ion-padding-start ion-padding-end">
                <!-- Gallery -->
                <ion-grid>
                    <ion-row>
                        <ion-col
                            v-for="photo in photos"
                            :key="photo.filepath"
                            size="6"
                        >
                            <template v-if="photo.webviewPath">
                                <ion-img :src="photo.webviewPath"/>
                            </template>
                        </ion-col>
                    </ion-row>
                </ion-grid>

                <!-- Take Photo Button -->
                <ion-fab vertical="bottom" horizontal="center" slot="fixed" @click="takePhoto">
                    <ion-fab-button color="danger">
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
        IonBackButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonFab,
        IonFabButton,
        IonIcon,
        IonGrid,
        IonRow,
        IonCol,
        IonImg
    } from '@ionic/vue';
    import { ref } from 'vue';
    import { camera, trash, close } from 'ionicons/icons';
    import { Camera, CameraResultType } from '@capacitor/camera';

    // type of photo data
    type PhotoType = {
        filepath: string,
        webviewPath: string | undefined
    }

    // photos array
    const photos = ref<PhotoType[]>([]);

    // takePhoto method
    const takePhoto = async () => {
        // take photo using Camera
        const cameraPhoto = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });

        // initialize fileName and savedFileImage
        const fileName = `${new Date().getTime()}.jpeg`;
        const savedFileImage: PhotoType = {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath
        };

        // prepend savedFileImage to photos
        photos.value = [savedFileImage, ...photos.value];
    };
</script>


<style scoped>

</style>
