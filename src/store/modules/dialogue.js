const REPLY_TIMEOUT = 1500;
const initialState = {
    finished: false,
    waiting: false,
    participant: null,
    currentLine: null,
    lines: null,
    messages: [],
};

export default store => {
    store.on('@init', () => {
        return {
            dialogue: {
                ...initialState
            }
        };
    });

    store.on('initDialogue', ({ dialogue }, { participant, lines }) => {
        return {
            dialogue: {
                ...dialogue,
                currentLine: 0,
                participant,
                lines,
                messages: [{ character: participant, message: lines[0].message }]
            }
        };
    });

    store.on('clearDialogue', ({ dialogue }) => {
        return {
            dialogue: {
                ...initialState
            }
        };
    });

    store.on('newMessage', ({ dialogue }, message) => {
        const { messages } = dialogue;
        return {
            dialogue: {
                ...dialogue,
                waiting: false,
                messages: [...messages, message]
            }
        };
    });

    store.on('reply', ({ dialogue }, reply) => {
        const { messages, participant, lines } = dialogue;

        setTimeout(
            () => store.dispatch('newMessage', { character: participant, message: lines[reply.link].message }),
            REPLY_TIMEOUT
        );

        return {
            dialogue: {
                ...dialogue,
                waiting: true,
                currentLine: reply.link,
                messages: [...messages, { message: reply.message }]
            }
        };
    });

};