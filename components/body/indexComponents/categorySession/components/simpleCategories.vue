<template>
  <div :style="layout.index.categorySession.default.class">
    <v-row :justify="layout.index.categorySession.justify">
      <v-col cols="4">
        <v-hover v-slot="{ hover }">
          <v-img
            :style="layout.index.categorySession.imgs[0].class"
            :src="layout.index.categorySession.imgs[0].src"
            alt="Imagem da categoria"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                :class="`d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text ${layout.index.categorySession.imgs[0].hoverColor}`"
                style="height: 100%"
              >
                {{ layout.index.categorySession.imgs[0].hoverName }}
              </div>
            </v-expand-transition>
          </v-img>
        </v-hover>
      </v-col>
      <v-col cols="8">
        <v-row
          class="no-margin"
          :justify="layout.index.categorySession.justify"
        >
          <v-col cols="12" class="no-margin">
            <v-hover v-slot="{ hover }">
              <v-img
                :style="layout.index.categorySession.imgs[1].class"
                :src="layout.index.categorySession.imgs[1].src"
                alt="Imagem da categoria"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    :class="`d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text ${layout.index.categorySession.imgs[1].hoverColor}`"
                    style="height: 100%"
                  >
                    {{ layout.index.categorySession.imgs[1].hoverName }}
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </v-col>
          <v-col cols="6">
            <v-hover v-slot="{ hover }">
              <v-img
                max-width="500"
                :style="layout.index.categorySession.imgs[2].class"
                :src="layout.index.categorySession.imgs[2].src"
                alt="Imagem da categoria"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    :class="`d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text ${layout.index.categorySession.imgs[2].hoverColor}`"
                    style="height: 100%"
                  >
                    {{ layout.index.categorySession.imgs[2].hoverName }}
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </v-col>
          <v-col cols="6">
            <v-hover v-slot="{ hover }">
              <v-img
                :style="layout.index.categorySession.imgs[3].class"
                :src="layout.index.categorySession.imgs[3].src"
                alt="Imagem da categoria"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    :class="`d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text ${layout.index.categorySession.imgs[3].hoverColor}`"
                    style="height: 100%"
                  >
                    {{ layout.index.categorySession.imgs[3].hoverName }}
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>


<script src='./../categoriesjs' />

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>


