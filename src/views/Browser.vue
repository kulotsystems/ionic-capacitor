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

            <!-- Browser -->
            <div class="ion-padding-start ion-padding-end">
                <div class="ion-padding-top">
                    <ion-button expand="block" color="primary" @click="goToPortfolio">
                        Portfolio
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
    import { Browser } from "@capacitor/browser";

    const goToPortfolio = async () => {
        await Browser.open({
            url: 'https://www.kulotsystems.tech/portfolio'
        });
    };
</script>


<style scoped>

</style>
