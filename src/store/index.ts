import { createStore } from 'vuex';
import { PhotoType, PhotoArrayType } from "@/types/Camera.type";

export default createStore({
    state: {
        Camera: {
            photos: [] as PhotoArrayType
        }
    },
    mutations: {
        prependCameraPhoto(state, savedFileImage: PhotoType) {
            state.Camera.photos.unshift(savedFileImage);
        }
    }
});
