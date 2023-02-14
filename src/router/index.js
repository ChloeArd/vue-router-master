import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import McdoView from "../views/McdoView.vue";
import KfcView from "../views/KfcView.vue";
import BurgerKingView from "../views/BurgerKingView.vue";
import NotFound from "@/views/NotFound.vue";
import menuData from "@/data.json";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {transition: "bounce"} // transition pour les vue
    },
    {
        path: "/menu-mc-burger",
        name: "mcdo",
        component: McdoView,
        meta: {transition: "bounce"}
    },
    {
        path: "/menu-kfc-burger",
        name: "kfc",
        component: KfcView,
        meta: {transition: "bounce"}
    },
    {
        path: "/menu-bk-burger",
        name: "bking",
        component: BurgerKingView,
        meta: {transition: "bounce"}
    },
    {
        path: "/menu/:id/:slug",
        name: "menu.show",
        component: () => import('@/views/MenuView.vue'), // permet de charger le js uniquemement a celui la, permet de charger plus rapidement les pages
        props: route => ({id: parseInt(route.params.id)}),
        meta: {transition: "bounce"},
        beforeEnter (to) {
            const urlExists = menuData.menus.find(menu => menu.id === parseInt(to.params.id));
            if (!urlExists) return { redirect: {name: 'home'}} // redirection si aucune ressources trouver, elle redirige vers la page home
        }
    },
    {
        path: "/ingredient/:id/:slug",
        name: "ingredient.show",
        component: () => import('@/views/IngredientView.vue'),
        props: route => ({id: parseInt(route.params.id), slug: route.params.slug}),
        meta: {transition: "bounce"}
    },
    {
        path: "/:catchAll(.*)", // Attrape tout ce qui n'existe pas
        component: NotFound // Affiche la page not found si l'url passé n'existe pas
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "lien-actif", // Ajoute la classe lien-actif sur les liens pour permettre d'ajouter du style sur chaque lien actif (cliqué)
});

export default router;