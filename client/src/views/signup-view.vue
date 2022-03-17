<template>
    <div>
        <v-form v-model="valid" ref="gaRegisterForm" @submit.prevent="submitLogin">
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
                            v-model="name"
                            :rules="userNameRules"
                            :counter="10"
                            label="Name"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
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
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                            v-model="confirmPassword"
                            :rules="passwordRules"
                            label="Confirm Password"
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
                    <router-link to="/ga/login">Already have an account?</router-link>
                </v-btn>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'GASignupView',

    data() {
        return {
            valid: true,
            userName: '',
            name: '',
            userNameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            password: '',
            confirmPassword: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        };
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>