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
</script>


<style scoped>

</style>
