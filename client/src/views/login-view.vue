<template>
    <div class="ga-login">
        <v-form v-model="valid" ref="gaLoginForm" @submit.prevent="submitLogin">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                            v-model="userName"
                            :rules="userNameRules"
                            :counter="10"
                            label="Username"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-row align-content="center" justify="center">
                <v-btn
                    color="success"
                    class="mr-4 ml-15"
                    type="submit"
                    :disabled="!valid"
                >
                    Login
                </v-btn>
            </v-row>
            <v-row align-content="center" justify="center">
                <v-btn outlined color="teal lighten-2" x-large class="mt-3 mb-3">
                    <router-link to="/ga/signup">Need an account?</router-link>
                </v-btn>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { GA_WELCOME_ROUTE_NAME } from '@/config/consts';

export default {
    name: 'GALoginView',

    data() {
        return {
            valid: true,
            userName: '',
            userNameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ],
        };
    },

    methods: {
        ...mapActions('authentication', ['fetchLogin']),
        async submitLogin() {
            const userToBeLoggedIn = {
                userName: this.userName,
                password: this.password,
            };
            try {
                let authSuccess = await this.fetchLogin(userToBeLoggedIn);
                if(authSuccess) {
                    this.$router.push({ name: GA_WELCOME_ROUTE_NAME });
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>