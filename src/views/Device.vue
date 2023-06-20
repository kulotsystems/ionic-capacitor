<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button/>
                </ion-buttons>
                <ion-title>Device</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Device</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- App Launcher -->
            <div class="ion-padding-start ion-padding-end">
                <!-- Device Info -->
                <h2>Info</h2>
                <p><pre>{{ deviceInfo }}</pre></p>

                <!-- Device ID -->
                <h2>ID</h2>
                <p><pre>{{ deviceId }}</pre></p>

                <!-- Battery -->
                <h2>Battery</h2>
                <p><pre>{{ batteryInfo }}</pre></p>

                <!-- Language Code -->
                <h2>Language Code</h2>
                <p><pre>{{ languageCode }}</pre></p>

                <!-- Language Tag -->
                <h2>Language Tag</h2>
                <p><pre>{{ languageTag }}</pre></p>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
    import {
        IonBackButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar
    } from '@ionic/vue';
    import { Device } from "@capacitor/device";
    import { ref } from "vue";

    // device info
    let deviceInfo = ref({});
    Device.getInfo().then(info => {
        deviceInfo.value = info;
    });

    // device id
    let deviceId = ref();
    Device.getId().then(id => {
        deviceId.value = id;
    });

    // battery
    let batteryInfo = ref();
    Device.getBatteryInfo().then(info => {
        batteryInfo.value = info;
    });

    // language code
    let languageCode = ref();
    Device.getLanguageCode().then(code => {
        languageCode.value = code;
    });

    // language tag
    let languageTag = ref();
    Device.getLanguageTag().then(tag => {
        languageTag.value = tag;
    });
</script>


<style scoped>

</style>
