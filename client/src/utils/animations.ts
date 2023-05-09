export const rightSlide = {
    hidden: {
        x: 100,
        opacity: 0,

    },
    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: {delay: custom * 0.3}
    })
}

export const leftSlide = {
    hidden: {
        x: -100,
        opacity: 0,

    },
    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: {delay: custom * 0.3}
    })
}

export const appear = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}