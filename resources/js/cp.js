Statamic.$components.register("page_number-fieldtype", {
    mixins: [Fieldtype],
    template: `
            <div v-if="isPdf">
                <div v-if="loading">
                    <loading-graphic text="Generating" />
                </div>
                <div class="flex" v-else>
                    <v-select :options="pageNumberList" :clearable="false" v-model="page" v-if="asset.values.pdf_page_count"/>
                    <text-input type="number" :min="1" v-model="page" v-else/>
                    <button type="button" class="btn ml-2" @click="convert">Generate</button>
                </div>
            </div>
            `,
    data: () => {

        return {
            page: 1,
            assetEditor: false,
            asset: false,
            loading: false
        };

    },
    created() {

        this.getAssetEditor();

    },
    methods: {

        getAssetEditor() {

            var parent = this.$stacks.stacks[0].$parent;

            while (parent) {

                if (parent.asset) {

                    this.assetEditor = parent;
                    this.asset = parent.asset;

                    break;

                }

                parent = parent.$parent ? parent.$parent : false;

            }

            this.page = this.asset.values.pdf_converted_page ?? 1

        },
        convert() {

            const self = this

            const url = cp_url('convert-pdf/');

            this.loading = true;

            this.$axios.post(url, {page: this.page, url: this.asset.url}, this.toEleven).then(response => {

                self.asset = response.data.asset;
                self.loading = false;
                self.$toast.success('The thumbnail has been generated.');

            })
            .catch(error => {

                self.loading = false;
                self.$toast.error('Something went wrong while generating.');

            });

        }
    },
    computed: {
        isPdf: function() {

            return this.asset && this.asset.isPdf

        },
        pageNumberList: function () {

            return [...Array(this.asset.values.pdf_page_count - 1 + 1).keys()].map(x => x + 1)

        },
    },
});
