<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button/>
                </ion-buttons>
                <ion-title>App Launcher</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">App Launcher</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- App Launcher -->
            <div class="ion-padding-start ion-padding-end" style="display: flex; justify-content: center">
                <div class="ion-padding-top">
                    <ion-button
                        v-for="app in apps"
                        :key="app.id"
                        color="primary"
                        @click="openApp(app.name, app.id)"
                        class="ion-margin-end"
                        style="width: 150px;"
                    >
                        <ion-icon :icon="app.logo" slot="start"/>
                        {{ app.name }}
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
    import {
        IonBackButton,
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon
    } from '@ionic/vue';
    import { AppLauncher } from "@capacitor/app-launcher";
    import { Toast } from "@capacitor/toast";
    import { logoFacebook, logoTwitter } from 'ionicons/icons';

    const apps = [
        {
            id  : 'com.facebook.katana',
            name: 'Facebook',
            logo: logoFacebook
        },
        {
            id  : 'com.twitter.android',
            name: 'Twitter',
            logo: logoTwitter
        }
    ];

    const openApp = async (appName: string, appId: string) => {
        const { value } = await AppLauncher.canOpenUrl({ url: appId });
        if(value) {
            await AppLauncher.openUrl({
                url: appId
            });
        }
        else {
            await Toast.show({
                text: `Cannot open ${appName}`
            });
        }
    };
</script>


<style scoped>

</style>
