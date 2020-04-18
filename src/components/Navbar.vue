<template>
    <v-container>
        

        <v-app-bar
            app
            clipped-left
            clipped-right
            color="blue darken-1"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title class="headline font-weight-light text-uppercase">Vuetify Admin Dashboard</v-toolbar-title>
            
            <v-spacer />
            <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" /> -->
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            clipped
            app
            temporary
            class="pt-6"
        >
            <v-list dense shaped>
                <v-list-item  color="blue darken-1" medium v-for="link in links" :name="link.text" :key="link.text" :to="link.route"> 
                    <v-list-item-action>
                        <v-icon color="blue darken-1">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="body-1">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

    </v-container>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-widgets', text: 'Dashboard', route: '/' },
                { icon: 'mdi-calendar', text: 'Calendar', route: '/calendar' },
                { icon: 'mdi-wrench', text: 'Services', route: '/services' },
                { icon: 'mdi-arrow-right-bold-circle', text: 'Migration', route: '/migration' },
                { icon: 'mdi-clock-outline', text: 'Schedule', route: '/schedule' },
            ]
        }
    }
  }
</script>

<style>
.active{
    background: 'red'
}
</style>