let canAccessWindow = false;
class EventManager {
    static allowAttachment () {
        canAccessWindow = true;
    }

    static on (type, callback) {
        if (!canAccessWindow) {
            throw new Error('EventManager must be used after onMount allows attachment.');
        }

        window.tbevents_.push({ type, callback });
    }

    // enums
    static get EVENT_THEME_CHANGED () {
        return 'THEME';
    }
}

export default EventManager;