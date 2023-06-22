<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button/>
                </ion-buttons>
                <ion-title>Dialog</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Dialog</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- Dialog -->
            <div class="ion-padding-start ion-padding-end">
                <!-- Alert -->
                <ion-button expand="block" color="light" class="ion-margin-top" @click="showAlert">
                    Alert
                </ion-button>

                <!-- Confirm -->
                <ion-button expand="block" color="light" class="ion-margin-top" @click="showConfirm">
                    Confirm
                </ion-button>

                <!-- Prompt -->
                <ion-button expand="block" color="light" class="ion-margin-top" @click="showPrompt">
                    Prompt
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
    import {
        IonBackButton, IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar
    } from '@ionic/vue';
    import { Dialog } from "@capacitor/dialog";

    // show alert
    const showAlert = async () => {
        await Dialog.alert({
            title: 'Alert',
            message: 'This is an error.'
        });
    };

    // show confirm
    const showConfirm = async () => {
        const { value } = await Dialog.confirm({
            title: 'Confirm',
            message: 'Are you sure to continue?'
        });

        if(value) {
            await Dialog.alert({
                title: 'Confirm',
                message: 'Thank you for confirming.'
            });
        }
    };

    // show prompt
    const showPrompt = async () => {
        const { value, cancelled } = await Dialog.prompt({
            title: 'Hello',
            message: 'What\'s your name?'
        });

        if(cancelled) {
            await Dialog.alert({
                title: 'Hello',
                message: 'We need your name.'
            });
        }
        else {
            await Dialog.alert({
                title: 'Hello',
                message: `Hello there, ${value}!`
            });
        }
    };
</script>


<style scoped>

</style>
