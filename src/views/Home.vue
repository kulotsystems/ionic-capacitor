<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Home</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button/>
                    </ion-buttons>
                    <ion-title size="large">Home</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- Home -->
            <div class="ion-padding-start ion-padding-end">
                <h3>Capacitor Demo</h3>
                <p>Demo of native app functionalities of <b>Capacitor</b>, a native runtime built by the <b>Ionic</b> team.</p>
                <ion-list>
                    <ion-item
                        v-for="(view, pageIndex) in views"
                        :key="view"
                        :router-link="{ name: view }"
                    >
                        <ion-label>{{ pageIndex + 1 }}. {{ view }}</ion-label>
                    </ion-item>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
    import {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonList,
        IonItem,
        IonLabel,
        IonButtons,
        IonBackButton
    } from '@ionic/vue';

    const views = [
        'Camera',
        'Haptics'
    ];
</script>


<style scoped>

</style>
