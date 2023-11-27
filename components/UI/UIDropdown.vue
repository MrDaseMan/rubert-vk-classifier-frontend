<template>
    <div class="dropdown" :style="getStyle" @mouseenter="onHover" @mouseleave="onIdle" >
        <div class="dropdown-base" :style="getBaseStyle" :class="{'dropdown-centered': isCentered || false, 'dropdown-evenly': isSpaceEvenly || false, 'dropdown-between': isSpaceBetween || false}">
            <div class="dropdown-base_inner">
                <slot name="dropdown-inner"/>
            </div>
            <div class="dropdown-base_arrow-wrapper">
                <LazySvgArrow width="32px" height="32px" class="dropdown-base_arrow" v-if="haveArrow" :style="getArrowRotation" :fill="getArrowColor"/>
            </div>
        </div>
        <transition :name="getContentAnimationType" mode="out-in" appear>
            <div v-if="isSelected" class="dropdown-content" :style="getContentStyle">
                <slot name="dropdown-content"/>
            </div>
        </transition>
    </div>
</template>
	
<script setup>
const props = defineProps({
    width: {
        type: String,
        default: "100%",
        required: false
    }, 
    height: {
        type: String,
        default: "100%",
        required: false
    }, 
    haveArrow: {
        type: Boolean,
        default: false,
        required: false
    },
    isCentered: {
        type: Boolean,
        default: false,
        required: false
    },
    isSpaceEvenly: {
        type: Boolean,
        default: false,
        required: false
    },
    isSpaceBetween: {
        type: Boolean,
        default: false,
        required: false
    },
    isSelected: {
        type: Boolean,
        default: false,
        required: false
    },
    isDisabled: {
        type: Boolean,
        default: false,
        required: false
    },
    isUnborderOnSelect: {
        type: Boolean,
        default: false,
        required: false
    },
    defaultBackground: {
        type: String,
        default: "",
        required: false
    },
    selectedBackground: {
        type: String,
        default: "",
        required: false
    },
    hoverBackground: {
        type: String,
        default: "",
        required: false
    },
    clickBackground: {
        type: String,
        default: "",
        required: false
    },
    borderRadius: {
        radius: {
            type: String,
            default: "10px",
            required: false
        },
        unequal: {
            type: Boolean,
            default: false,
            required: false
        },

        top_left: {
            type: String,
            default: "10px",
            required: false
        },
        top_right: {
            type: String,
            default: "10px",
            required: false
        },
        bottom_left: {
            type: String,
            default: "10px",
            required: false
        },
        bottom_right: {
            type: String,
            default: "10px",
            required: false
        }
    },
    isContentAbsolute: {
        type: Boolean,
        default: false,
        required: false
    },
    isContentAnimatedAppear: {
        type: Boolean,
        default: true,
        required: false
    },
    animationType: {
        type: String,
        default: "fade",
        required: false
    },
    topMargin: {
        type: String,
        default: "100%",
        required: false
    },
    borderColor: {
        type: String,
        default: "",
        required: false
    }
})

var isHover = ref(false);

const getStyle = computed(() => {
    return {
        opacity: props.isDisabled ? 0.5 : 1,
        '--default-background': props.isSelected ? props.selectedBackground : props.defaultBackground,
        '--hover-background': props.hoverBackground,
        '--click-background': props.clickBackground,
    }
});

const getBaseStyle = computed(() => {
    let border_round = props.isSelected && props.isUnborderOnSelect ? `10px 10px 0 0` : `10px`;

    if(props.borderRadius)
        if(props.borderRadius.unequal)
        {
            let top_left = props.borderRadius.top_left;
            let top_right = props.borderRadius.top_right;
            let bottom_left = props.borderRadius.bottom_left;
            let bottom_right = props.borderRadius.bottom_right;

            border_round = props.isSelected && props.isUnborderOnSelect ? `${top_left} ${top_right} 0 0` : `${top_left} ${top_right} ${bottom_left} ${bottom_right}`;
        }
        else {
            let radius = props.borderRadius.radius;
            border_round = props.isSelected && props.isUnborderOnSelect ? `${radius} ${radius} 0 0` : `${radius}`;
        }
        
    return {
        width: props.width,
        height: props.height,
        //filter: isHover.value ? "brightness(120%)" : "brightness(100%)",
        //cursor: isHover.value ? "pointer" : "default",
        borderRadius: border_round
    }
});

const getArrowRotation = computed(() => {
    return {
        transform: `rotate(${props.isSelected ? 540 : 0}deg)` // Если крутилка не зайдёт, понизить 540 до 180
    }
});

const getArrowColor = computed(() => {
    if(isHover.value)
        return "#FFFFFF"

    if(props.isSelected)
        return "#FFFFFF"

    return "#8D97A6"
});

const getContentStyle = computed(() => {
    let isAbsolute = props.isContentAbsolute;
    return {
        position: isAbsolute ? "absolute" : "innerhit",
        top: props.topMargin,
        left: 0
    }
});

const getContentAnimationType = computed(() => {
    if(!props.isContentAnimatedAppear || !props.animationType)
        return ''
    return props.animationType
});

const onHover = () => {
    if(!props.isDisabled)
        isHover.value = true;
};

const onIdle = () => {
    isHover.value = false;
};
</script>
	
<style lang="scss" scoped>
.dropdown {
    display: block;
    position: relative;
    cursor: pointer;

    background: var(--default-background);

    transition: filter ease 0.2s, background ease-in-out 0.2s, opacity ease-in-out .3s;
    width: 100%;

    &:hover {
        background: var(--hover-background);

        transition: filter ease 0.2s, background ease-in-out 0.2s, opacity ease-in-out .3s;
    }

    &:active {
        background: var(--click-background);

        
        transition: filter ease 0.2s, background ease-in-out 0.2s, opacity ease-in-out .3s;
    }
    
    &-base {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        transition: border-radius ease 0.5s, filter ease 0.3s;

        border-bottom: 1px solid var(--yw-clr-black-20);

        &_arrow-wrapper {
            width: 32px;
            height: 32px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: transparent;
        }

        &_arrow {
            z-index: 10;
            transition: transform ease 0.5s;

            width: 24px;
            height: 24px;
        }

        &_inner {
            display: flex;
            align-items: center;

            box-sizing: content-box;
        }
    }

    &-content {
        z-index: 999;
        width: 100%;
        height: auto;
        top: 0;
    }

    &-centered {
        justify-content: center;
    }

    &-evenly {
        justify-content: space-evenly;
    }

    &-between {
        justify-content: space-between;
        box-sizing: border-box;
    }
}

.fade-leave-from,
.fade-enter-active {
    animation: fade-in .3s;
}
.fade-leave-active {
    animation: fade-out .3s;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.slide-leave-from,
.slide-enter-active {
    animation: slide-in .6s ease-in-out;
}
.slide-leave-active, .slide-leave-to {
    animation: slide-out .3s ease-in-out;
}

@keyframes slide-in {
    0% {
        max-height: 0px;
        overflow: hidden;
    }
    100% {
        max-height: 512px;
        overflow: hidden;
    }
}

@keyframes slide-out {
    0% {
        max-height: 512px;
        overflow: hidden;
    }
    100% {
        max-height: 0px;
        overflow: hidden;
    }
}
</style>