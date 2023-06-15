<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button/>
                </ion-buttons>
                <ion-title>Haptics</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Haptics</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- Haptics -->
            <div class="ion-padding-start ion-padding-end">
                <!-- Impact -->
                <div class="ion-padding-top">
                    <ion-button expand="block" color="light" @click="hapticsImpactLight">
                        Light Impact
                    </ion-button>
                    <ion-button expand="block" color="light" @click="hapticsImpactMedium">
                        Medium Impact
                    </ion-button>
                    <ion-button expand="block" color="light" @click="hapticsImpactHeavy">
                        Heavy Impact
                    </ion-button>
                </div>

                <!-- Vibrate -->
                <div class="ion-padding-top">
                    <ion-button expand="block" color="danger" @click="hapticsVibrate">
                        Vibrate
                    </ion-button>
                </div>

                <!-- Selection -->
                <div class="ion-padding-top">
                    <ion-button expand="block" color="primary" @click="hapticsSelectionStart">
                        Selection Start
                    </ion-button>
                    <ion-button expand="block" color="success" @click="hapticsSelectionChanged">
                        Selection Changed
                    </ion-button>
                    <ion-button expand="block" color="primary" @click="hapticsSelectionEnd">
                        Selection End
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
    import { Haptics, ImpactStyle } from "@capacitor/haptics";

    // light impact
    const hapticsImpactLight = async () => {
        await Haptics.impact({
            style: ImpactStyle.Light
        });
    };

    // medium impact
    const hapticsImpactMedium = async () => {
        await Haptics.impact({
            style: ImpactStyle.Medium
        });
    };

    // heavy impact
    const hapticsImpactHeavy = async () => {
        await Haptics.impact({
            style: ImpactStyle.Heavy
        });
    };

    // vibrate
    const hapticsVibrate = async () => {
        await Haptics.vibrate();
    };

    // selection start
    const hapticsSelectionStart = async () => {
        await Haptics.selectionStart();
    };

    // selection changed
    const hapticsSelectionChanged = async () => {
        await Haptics.selectionChanged();
    };

    // selection end
    const hapticsSelectionEnd = async () => {
        await Haptics.selectionEnd();
    };
</script>


<style scoped>

</style>
