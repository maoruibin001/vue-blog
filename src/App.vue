<template>
    <div id="app">
        <fire-canvas class="fire" />
        <router-view />
        <!-- <spinner /> -->
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <dialog-box v-if="dialog.show" />
        </transition>
    </div>
</template>

<script>
    import FireCanvas from './components/share/FireCanvas'
    import spinner from './components/share/spinner'
    import DialogBox from './components/share/DialogBox'
    import {
        debounce
    } from 'lib/utils'
    import {
        mapState
    } from 'vuex'
    export default {
        components: {
            FireCanvas,
            spinner,
            DialogBox
        },
        mounted() {
            window.onresize = debounce(() => {
                window.location.reload()
            }, 200)
            document.addEventListener('visibilitychange', this.changeTitle, false)
        },
        computed: {
            ...mapState(['dialog'])
        },
        methods: {
            changeTitle() { // 切换标签页后，改变title
                if (document.hidden) {
                    document.title = 'Go ahead, Pikachu'
                } else {
                    document.title = 'welcome to back again'
                }
            }
        }
    }
</script>

<style>
    #app {
        margin: 0;
        padding: 0;
        overflow: hidden;
        min-height: 100%;
        width: 100%;
    }
     ::-webkit-scrollbar {
        display: none
        /* position: absolute; */
    }
    @media screen and (max-width: 440px) {
        .fire {
            display: none;
        }
        #app {
            background: #000;
        }
    }
</style>
