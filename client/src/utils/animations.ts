export const rightSlide = {
    hidden: {
        x: 100,
        opacity: 0,

    },
    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: {delay: custom * 0.2}
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
        transition: {delay: custom * 0.2}
    })
}

export const appear = {
    hidden: {
        opacity: 0
    },
    visible: (custom: { duration: number, delay: number } = {duration: 1, delay: 0}) => ({
        opacity: 1,
        transition: {
            duration: (custom.duration || 1) * 0.2,
            delay: (custom.delay || 0) * 0.2
        }
    })
}