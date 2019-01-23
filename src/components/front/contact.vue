<template>
    <div class="contact">
        <a href="#callMe" class="title animated bounceIn">
            <p id="callMe" class="headline">
                Contact me
            </p>
        </a>
        <div class="email animated fadeIn">
            <input v-model="subject" type="text" placeholder="邮件主题">
            <input v-model="address" type="text" placeholder="邮箱">
            <textarea v-model="content" placeholder="想说的话..." spellcheck="false" />
            <button class="sendEmail" :disabled="isSending" @click="send">
            <span>{{ isSending ? '发送中...' : '确认' }}</span>
          </button>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                subject: '',
                address: '',
                content: '',
                isSending: false
            }
        },
        created() {
            this.set_headline({
                content: '联系站长',
                animation: 'animated rotateIn'
            })
        },
        methods: {
            ...mapMutations(['set_headline', 'set_dialog']),
            ...mapActions(['sendMail']),
            send() {
                const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
                if (!this.subject || !this.content) {
                    return this.set_dialog({
                        info: '还有选项没填(⊙o⊙)？',
                        hasTwoBtn: false,
                        show: true
                    })
                } else if (!re.test(this.address)) {
                    return this.set_dialog({
                        info: '请正确填写邮箱地址',
                        hasTwoBtn: false,
                        show: true
                    })
                }
                this.isSending = true
                const {subject, address, content} = this;
                this.sendMail({subject, address, content}).then(() => {
                    this.subject = ''
                    this.content = ''
                    this.address = ''
                    this.isSending = false
                }).catch(() => {
                    this.isSending = false
                    this.set_dialog({
                        info: 'sorry, 邮件发送失败，请重新发送',
                        hasTwoBtn: false,
                        show: true
                    })
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .contact {
        min-height: 30rem;
        background: rgba(55, 57, 65, 0.2);
        padding: 2rem 1rem 2rem;
        .title {
            padding-top: 3.125rem;
            padding-bottom: 3.125rem;
            p {
                width: 13rem;
            }
        }
        .email {
            width: 40%;
            margin: 2rem auto 0;
            input {
                color: #ffffff;
                font-size: 1.125rem;
                border: 0.125rem solid rgb(129, 216, 208);
                width: 70%;
                height: 1.5625rem;
                margin-bottom: 1.25rem;
                display: block;
                background: transparent;
            }
            textarea {
                color: #ffffff;
                font-size: 1.125rem;
                border: 0.125rem solid rgb(129, 216, 208);
                width: 100%;
                height: 15rem;
                resize: none;
                background: transparent;
                font-family: Georgia, "Microsoft YaHei", "微软雅黑", STXihei, "华文细黑", serif;
            }
            .sendEmail {
                width: 6.25rem;
                margin-top: 0.625rem;
                margin-left: calc(100% - 6.25rem);
            }
        }
    }
    p.headline {
        margin: 0 auto 0;
        text-align: center;
        color: #fff;
        font-size: 2rem;
        padding-bottom: 1.25rem;
        border-bottom: 0.3125rem double rgb(129, 216, 208);
    }
    @media screen and (max-width: 440px) {
        /*.title, .email {*/
        /*display: block !important;*/
        /*}*/
        .email {
            width: 100% !important;
        }
    }
</style>
