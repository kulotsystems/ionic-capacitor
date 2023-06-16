<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button/>
                </ion-buttons>
                <ion-title>Browser</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Browser</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- Status Bar -->
            <div class="ion-padding-start ion-padding-end">
                <!-- Overlay -->
                <div class="ion-padding-top">
                    <ion-button expand="block" color="light" @click="setStatusBarOverlay(true)">
                        Lift Up
                    </ion-button>
                    <ion-button expand="block" color="light" @click="setStatusBarOverlay(false)">
                        Put Down
                    </ion-button>
                </div>
                <!-- Style -->
                <div class="ion-padding-top">
                    <ion-button expand="block" color="light" @click="setStatusBarStyleDefault">
                        Default
                    </ion-button>
                    <ion-button expand="block" color="light" @click="setStatusBarStyleLight">
                        Light
                    </ion-button>
                    <ion-button expand="block" color="light" @click="setStatusBarStyleDark">
                        Dark
                    </ion-button>
                </div>

                <!-- Show / Hide -->
                <div class="ion-padding-top">
                    <ion-button expand="block" color="success" @click="showStatusBar">
                        Show
                    </ion-button>
                    <ion-button expand="block" color="danger" @click="hideStatusBar">
                        Hide
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
        IonToolbar
    } from '@ionic/vue';
    import { StatusBar, Style } from "@capacitor/status-bar";

    // (iOS only)
    window.addEventListener('statusTap', function () {
        console.log('Statusbar tapped');
    });

    // overlay (Android only)
    const setStatusBarOverlay = (bool: boolean) => {
        StatusBar.setOverlaysWebView({ overlay: bool });
    };

    // style default
    const setStatusBarStyleDefault = async () => {
        await StatusBar.setStyle({ style: Style.Default });
    };

    // style light
    const setStatusBarStyleLight = async () => {
        await StatusBar.setStyle({ style: Style.Light });
    };

    // style dark
    const setStatusBarStyleDark = async () => {
        await StatusBar.setStyle({ style: Style.Dark });
    };

    // show
    const showStatusBar = async () => {
        await StatusBar.show();
    };

    // hide
    const hideStatusBar = async () => {
        await StatusBar.hide();
    };
</script>


<style scoped>

</style>
