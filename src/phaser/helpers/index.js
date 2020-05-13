export const eventBridge = {
    emit(event, payload) {
        if (!window.eventBridge) return false;

        window.eventBridge.emit(event, payload);
        return true;
    }
}