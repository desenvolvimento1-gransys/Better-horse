let mainColor = '#4e2315';
let secondaryColor = 'white';
let thirdColor = '#924227';
let fourthColor = '#1A739C';
let inputColor = 'black';
let iconColor = 'grey';
let confirmColor = '#66bb6a';
let cancelColor = '#e57373';
let errorColor = 'red';
let defaultGold = '#d2ad6d';

let merchantInfo = {
    companyName: 'Better Horse',
    cnpj: '11.734.898/0001-48',
    whatsappNumber: "(19) 99627-9406",

    phone: " (19) 3571-2018",
    email: "...@...",
    address: "Rua Coronel Antonio Abade, 353 - Barra Funda, Leme/SP",
    workingHours: "Segunda a Sexta das 9:00h. às 18:00h. Sábados das 9:00h. às 14:00h.",
    location: "...",
    installment: 12,

    facebook: "https://www.facebook.com/BetterHorse/",
    instagram: "https://www.instagram.com/loja_betterhorse/",

    get emailLink() {
        return `mailto:${this.email}`;
    },

    get copyright() {
        return `Copyright ${this.companyName} - CNPJ ${this.cnpj}`;
    },

    get whatsappLink() {
        return `https://api.whatsapp.com/send?phone=${'55' + this.whatsappNumber.replace(/[^0-9]/g, '')}`;
    }

};
//Muda logo do topo
let logo = "/img/logo.jpg";
//Muda logo do footer
let logoAlt = "/img/logo.jpg";

export default () => ({
    config: {
        pixel: false,
        addExtraSizesInProductPage: false,
        FreightCart: false,
        minimumValueFretch: 200,
        addBackToTop: true,
        checkoutMode: 'V1',

        atribute: {
            show: false,
            atributes: [
                {
                    atributeName: "Aro Feminino",
                    labelName: "Aro Feminino",
                    type: "overflow-btn",
                    typeable: false,
                    required: true
                },
                {
                    atributeName: "Aro Masculino",
                    labelName: "Aro Masculino",
                    type: "overflow-btn",
                    typeable: false,
                    required: true
                }
                ,
                {
                    atributeName: "Gravacao Feminina",
                    labelName: "Gravação Feminina",
                    typeable: true,
                    required: true
                }
                ,
                {
                    atributeName: "Gravacao Masculina",
                    labelName: "Gravação Masculina",
                    typeable: true,
                    required: true
                },
                {
                    atributeName: "Bordado",
                    labelName: "Bordado",
                    type: "autocomplete",
                    typeable: false,
                    required: false
                },
                {
                    atributeName: "Turbante",
                    labelName: "Turbante",
                    type: "autocomplete",
                    typeable: false,
                    required: false
                }
            ]
        },
        apiVersion: {
            deliveryCheck: 'V2',
            createBuy: 'V2',
            finishPayment: 'V2'
        },

        storeName: "Mini Kids",
        externalSites: {
            correios: "https://buscacepinter.correios.com.br/app/endereco/index.php?t"
        },

        supportText: '* Caso algum dado esteja incorreto, envie um email com a cópia do documento (cpf/ cnpj) para:',
        supportEmail: merchantInfo.email,

        productWithoutStockPhrase: 'Esgotado',
        product: {
            showBrandInProductPage: true,
            showBrandInFirstPage: false, //Inactive in this layout
            selectSizeIfOnlyOne: true,
            showColorIfNA: false,
            showSizeIfNA: false,
            showColorIfOnlyOne: true,
            showSizeIfOnlyOne: true,
        },
        search: {
            filters: true,
            showSizeFilter: true,
            showColorFilter: true
        },
        delivery: {
            withdrawlText: `Retirada de ${merchantInfo.workingHours}`,
        },
        showModalInClickCartIcon: true,
        genderList: [
            { value: "m", name: "Masculino" },
            { value: "f", name: "Feminino" },
            { value: "o", name: "Outro" },
        ],
        ordenationSizes: [
            { name: 'p' },
            { name: 'm' },
            { name: 'g' },
            { name: 'gg' },
            { name: 'xg' },
            { name: 'g1' },
            { name: 'g2' },
            { name: 'g3' },
            { name: 'g4' },

            { name: '1' },
            { name: '2' },
            { name: '3' },
            { name: '4' },
            { name: '5' },
            { name: '6' },
            { name: '7' },
            { name: '8' },
            { name: '9' },
            { name: '10' },
            { name: '12' },
            { name: '13' },
            { name: '14' },
            { name: '15' },
            { name: '16' },
            { name: '17' },
            { name: '18' },
            { name: '19' },
            { name: '20' },
            { name: '21' },
            { name: '22' },
            { name: '23' },
            { name: '24' },
            { name: '25' },
            { name: '26' },
            { name: '27' },
            { name: '28' },
            { name: '29' },
            { name: '30' },
            { name: '31' },
            { name: '32' },
            { name: '33' },
            { name: '34' },
            { name: '35' },
            { name: '36' },
            { name: '37' },
            { name: '38' },
            { name: '39' },
            { name: '40' },
            { name: '41' },
            { name: '42' },
            { name: '43' },
            { name: '44' },
            { name: '45' },
            { name: '46' },
            { name: '47' },
            { name: '48' },
            { name: '49' },
            { name: '50' },
            { name: '52' },
            { name: '54' },
            { name: '56' },

        ],
        paymentCard: {
            urlLogo: logoAlt
        },
        paymentMethods: {
            creditCard: true,
            pix: true
        },
        pixKeys: {
            cnpj: merchantInfo.cnpj
        },
        installmentRule: {
            minimumInstallmentValue: 30,
            minimumInstallmentTimes: 1,
            maximumInstallmentTimes: merchantInfo.installment
        }
    },
    fobOptions: {
        addFreightByTheBuyerInDefaultDeskScreen: false, //Escolhe se quer adicionar os campos de texto FOB no componente DefaulScreen(Desk e Mob)
        addFreightFOBinCartDefault: false, //Escolhe se irá selecionar as mensagens no componente cartDefault
        addFreightByTheBuyeinDelivery: false, //Seta irá aparecer no component delivery
        addTextFobinDelivery: 'true',     //Seta a mensagem que irá aparecer em no component delivery
        buttonFreightByTheBuyerDelivery: false, //Escolhe se terá o botão com o link do wpp no componente delivery
        AddtextFreightByFOBinDelivery: false, //Add o texto com a msg no componente delivery
        addFreightFOBinOrderResume: false,
        buttonFreightByTheBuyer: false, //Escolhe se terá o botão com o link do wpp
        textButtonFreightByTheBuyer: 'Consulte um representante', //Seta o texto do botão
        textButtonFreightByTheBuyerCartDefault: 'FOB',
        linkButtonFob: false,
        AddtextFreightByFOB: false, //Add o texto com a msg
        AddtextFreightByFOBinCartDefault: false,
        textFreightByFOB: 'TEXTO PARA FRETE POR CONTA DO COMPRADOR', //Muda o texto
    },
    layout: {
        initLoader: {

            active: false,

            style: {
                'background-color': secondaryColor,
                width: '100%',
                height: '100%'
            },

            logo: {
                width: '15%',
                height: '15%',

                style: {
                },
                src: logoAlt
            },
            loadingText: {
                style: {
                    color: mainColor
                }
            }
        },
        containerDefault: {
        },
        default: {
            app: {
                // 'font-family': "'Fjalla One', sans-serif",
                'font-weight': '700',
                'font-family': "'Mulish', sans-serif",
                'background-color': secondaryColor
            },
            nuxtDivStyle: {
                'min-height': '400px'
            }
        },
        topBar: {
            main: {
                'font-family': "'Bree Serif', serif",
                'background-color': 'white'
            },
            phone: {
                cols: 12,
                sm: 4,
                alignSelf: 'center',

                disabled: false,

                label: 'Telefone (c/ DDD) *',
                color: inputColor,
                style: {
                    color: 'grey'
                },
                class: '',

                errorMessage: ''
            },
            logoUrl: logo,
            sizes: {
                'max-width': '1300px !important;',
                'align-items': 'center',
                'margin': 'auto',

            },
            icons: {
                color: 'black'
            },
            iconsText: {
                color: 'black',
                'font-weight': '400',
                'font-family': "'Roboto', sans-serif",
                'font-size': '14px'
            },
            cartIcon: {
                class: 'mdi mdi-shopping-outline cart-icon',
                style: {
                    color: 'black',
                    'font-size': '30px',

                }
            },
            cartText: {
                color: 'black',
            },
            topBarLogoImg: {
                height: '50px ',
                width: 'auto',
                padding: '0 0 0px 0 !important'
            },
            searchInput: {
                border: 'solid rgba(128, 128, 128, 0.322) 1px',
                width: '100%',
                color: 'black !important',
                'border-radius': '50px',
                //  height: '40px'
            },
            searchInputBtn: {
                'font-size': '22px',

            },
            mobile: {
                main: {
                    'background-color': secondaryColor,
                },
                logoUrl: logo,
                logoStyle: {
                    width: '140px !important',
                },
                navIcon: {
                    icon: 'fas fa-bars',
                    style: {
                        'font-size': '23px !important',
                        color: iconColor,
                    }
                },
                cart: {
                    icon: 'mdi mdi-shopping-outline cart-icon',
                    style: {
                        'font-size': '27px !important',
                        color: iconColor
                    }
                },
                searchInput: {
                    position: 'relative',
                    border: 'solid rgba(128, 128, 128, 0.322) 1px',
                    background: 'rgba(255, 255, 255, 0.877)',
                    width: '100%',
                    color: 'black !important',
                    height: '40px',
                    width: '90%',
                    padding: '0 0 0 10px',
                    margin: '0 5% 0 5% !important'
                },
                searchInputBtn: {
                    position: 'absolute',
                    margin: '30px 0 0 0px',
                    right: '10px',
                    bottom: '0px',
                    "box-shadow": 'none !important',
                    "font-size": '23px !important',
                    height: '40px !important',
                    background: 'none !important',
                    color: iconColor
                },
            }
        },
        navBar: {
            main: {
                'background-color': '#4e2315',
                border: 'solid rgba(128, 128, 128, 0.214) 1px',
                'font-family': "'Montserrat', sans-serif"
            },
            navText: {
                color: secondaryColor,
                'font-size': '16px',
                padding: '10px 15px 10px 15px',
                'text-transform': 'uppercase'
            },
            sub: {
                'background-color': secondaryColor
            },
            subText: {
                color: 'black',
            },
            mobile: {
                main: {
                    height: '100%',
                    overflow: 'hidden',
                    'background-color': secondaryColor,

                },
                linkStyle: {
                    'border-bottom': 'solid rgba(128, 128, 128, 0.336) 1px',
                    width: '100%',
                },
                login: {
                    name: 'Login',
                    link: '/login',
                    icon: {
                        class: 'mdi-account-outline',
                        style: {
                            color: secondaryColor,
                        }
                    },
                    style: {
                        'text-decoration': 'none',
                        color: secondaryColor,
                    }
                },
                linkList: {

                    account: {
                        name: 'Conta',
                        link: '/conta/minha-conta',
                        icon: {
                            class: 'mdi-account-outline',
                            style: {
                                color: iconColor
                            }
                        },
                        style: {
                            'text-decoration': 'none',
                            color: iconColor
                        }
                    },
                    orders: {
                        name: 'Pedidos',
                        link: '/conta/pedidos',
                        icon: {
                            class: 'mdi-clipboard-list-outline',
                            style: {
                                color: iconColor
                            }
                        },
                        style: {
                            'text-decoration': 'none',
                            color: iconColor
                        }
                    }

                },
                navItemsStyle: {
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                },
                itemStyle: {
                    color: 'black',
                    'text-decoration': 'none'
                },
                subItemStyle: {
                    'text-decoration': 'none'
                },
                chevronStyle: {
                    color: 'black',
                }

            }
        },
        index: {
            carousel: {
                interval: 2000,
                frameRate: 3 / 8,
                items: [
                    {
                        src: "/banner/capadosite1.png",
                    },
                    {
                        src: "/banner/capasite2.gif",
                    }
                ]
            },
            information: {
                items: [
                    { icon: 'mdi mdi-truck-check-outline', bold: '  Frete grátis', text: 'acima de R$ 99,99' },
                    { icon: 'mdi mdi-card-account-details-outline', bold: `  ${merchantInfo.installment}x s/ juros`, text: 'nos cartões de crédito' },
                    { icon: 'mdi mdi-checkbox-multiple-marked', bold: 'Pronta entrega', text: 'em todo site' }
                ],
                rowClass: {
                },
                colClass: {
                    color: 'black !important'
                },
                icons: {
                    'font-size': '30px'
                },
                boldText: {
                    'font-family': "'Roboto', sans-serif !important",
                    'padding': '0 0 25px 0 !important',
                    'font-size': '13px',
                    color: 'black !important'
                },
                text: {
                    'padding-bottom': '5px',
                    'font-size': '12px'
                },
                mobile: {
                    iconsStyle: {
                        color: 'black !important'
                    },
                    boldTextStyle: {
                        color: 'black !important'
                    },
                    textStyle: {
                        color: 'black !important'
                    }
                }
            },
        },
        search: {
            home: {
                main: {
                    margin: '110px 25px 90px 25px',
                },
                title: 'Destaques',
                titleStyle: {
                    'background-color': secondaryColor,
                    // 'text-transform': 'uppercase',
                    'border-top': 'solid  2px',

                    "border-image": `radial-gradient(circle, rgba(145, 65, 39,1) 65%, rgba(254,245,196,1) 97%) 1 !important`,
                    color: 'black',
                    'font-family': "'Koulen', cursive",

                },
                titleClass: 'text-center',
            },
            alert: {
                cols: 11,
                sm: 8,

                style: {
                    'max-width': '300px !important'
                },
                justify: 'center',
                align: 'center',

                icon: 'mdi-alert-box-outline',
                color: iconColor,

                text: 'Não foi possível encontrar nenhum produto!'
            },
            showMoreBtn: {
                title: 'Ver Mais',
                main: {
                    margin: '90px 0 0 0',
                    height: '45px !important',
                    width: '35% !important',
                    border: 'none',
                    'background-color': 'black',
                    color: secondaryColor,
                    'font-size': '12px !important'
                }
            },
            accordion: {
                main: {
                },
                expPanel: {
                    'min-width': '120px',
                    margin: '8px 0 0 0 !important'
                },
                expHeader: {
                    'font-size': '14px'
                },
                expContent: {
                    'max-height': '300px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto'
                },
                expColorCheckBox: {
                    height: '30px !important',
                    'margin-top': '5px !important',
                    'margin-bottom': '5px !important'
                },
                expSizeCheckBox: {
                    height: '30px !important',
                    'margin-top': '5px !important',
                    'margin-bottom': '5px !important'
                }
            },
            category: {
                main: {
                },
                accordion: {
                    cols: 3,
                    xl: 2,
                },
                items: {
                    cols: 9,
                    xl: 10,
                },
                titleStyle: {
                    'border-bottom': 'solid  rgba(128, 128, 128, 0.214) 1px'
                },
            },
            productCard: {
                imgAspectRatio: '0.7',
                placeholder: logoAlt,

                mainStyle: {
                    padding: '20px 12px 0px 12px',
                    margin: '15px 0 0 0'
                },
                installmentConfig: {
                    installment: merchantInfo.installment
                },
                imgStyle: {
                    height: 'auto'
                },
                nameStyle: {
                    padding: '10px 0 0 0',
                    'font-weight': '500 !important',
                    'overflow': 'hidden',
                    'text-overflow': 'hidden',
                    display: '-webkit-box',
                    '-webkit-line-clamp': 2,
                    '-webkit-box-orient': 'vertical'
                },
                textArea: {
                    style: {
                        'min-height': '59px',
                        height: '100vh',
                        'max-height': '66px'
                    }
                },
                discountPriceStyle: {
                    'margin-left': ' 0px !important',
                    'text-decoration': 'line-through',
                    color: 'rgba(128, 128, 128, 0.803)',
                    'font-size': '14px',
                    'font-weight': '300 !important',

                },
                priceStyle: {
                    'font-weight': '600 !important',

                },
                installmentPriceStyle: {
                    padding: '0px 0 0 0 !important',
                    'font-weight': '500 !important',
                    'font-size': '14px !important',
                    'font-family': "'Montserrat', sans-serif",
                },
                noBalanceProduct: {
                    style: {
                        margin: '0px !important',
                        color: "grey",
                        'font-weight': '600 !important'
                    },
                    class: {

                    }
                },
                buttonStyle: {
                    margin: '20px 0 0 0',
                    width: '100%',
                    height: '40px',
                    'font-size': '15px',
                    // 'background-color': 'black',
                    color: 'black',
                    'border-radius': '8px !important',
                    'border': '2px solid  #4e2315 !important',
                },
                btnName: 'Detalhes',
                hrStyle: {
                    color: thirdColor,
                }
            }
        },
        productPage: {
            mainStyle: {
                margin: '30px 0 0 0 !important'
            },
            selectedImgColStyle: {
            },
            availableImgColStyle: {
                padding: '9px 10px 0 10px   !important'
            },
            availableImgCardStyle: {
                'box-shadow': 'none !important',
            },
            availableImgStyle: {
            },
            placeholder: logoAlt,
            informationColStyle: {
                padding: '0px 0 0 0   !important',
                margin: '0px 0 0 0   !important'
            },
            productNameStyle: {
                'font-size': '22px',
                'font-weight': '500',
                margin: '0px 0 9px 0 !important'
            },
            productNameClass: {

            },
            brand: {
                show: true,
                style: {
                    color: 'black',
                    'font-size': '14px',
                    margin: '0px 0 2px 0 !important'
                },
                class: null
            },
            ref: {
                show: true,
                style: {
                    color: 'black',
                    'font-size': '13px',
                    margin: '0px !important'
                },
                class: null
            },
            color: {
                mainStyle: {
                    margin: '34px 0 0 0'
                },
                titleStyle: {
                    'font-size': '18px'
                },
                titleClass: {

                },
                btnStyle: {
                    'box-sizing': 'inherit',
                    'min-width': '0 !important',
                    'width': '32px !important',
                    'height': '32px !important', 'padding': '3px !important',
                    margin: '0 4px 4px 0'
                },
                selectedBtnStyle: {
                    'box-shadow': 'inset 0px 0px 10px 2px darkgrey',
                    'box-sizing': 'inherit',
                    'min-width': '0 !important',
                    'width': '30px !important',
                    'height': '30px !important',
                    'padding': '3px !important',
                    margin: '0 6px 6px 0'
                },
                btnClass: {

                }
            },
            size: {
                mainStyle: {
                    margin: '34px 0 0 0'
                },
                titleStyle: {
                    'font-size': '18px'
                },
                titleClass: {

                },
                btn: {
                    defaultStyle: {
                        'box-sizing': 'inherit',
                        'min-width': '0 !important',
                        'width': '32px !important',
                        'height': '32px !important',
                        'border': 'solid 1px black !important',
                        'padding': '3px !important',
                        margin: '0 4px 0 0',
                        color: 'black',
                        cursor: 'pointer'
                    },
                    defaultClass: {

                    },
                    selectedStyle: {
                        'box-sizing': 'inherit',
                        'min-width': '0 !important',
                        'width': '30px !important',
                        'height': '30px !important',
                        'border': 'solid 2px black !important',
                        'padding': '3px !important',
                        margin: '0 4px 0 0',
                        color: 'black',
                        'font-weight': 'bold'
                    },
                    disabledStyle: {
                        'box-sizing': 'inherit',
                        'min-width': '0 !important',
                        'width': '32px !important',
                        'height': '32px !important',
                        'border': 'solid 1px  rgba(128, 128, 128, 0.201) !important',
                        'padding': '3px !important',
                        margin: '0 4px 0 0',
                        color: 'rgba(128, 128, 128, 0.541)'
                    }
                }
            },
            priceAndBuy: {
                installments: merchantInfo.installment,
                installmentStyle: {

                },
                mainStyle: {
                    margin: '30px 0 0 0 !important',
                    'border-top': ' rgba(128, 128, 128, 0.308) 1px solid',
                    'border-bottom': ' rgba(128, 128, 128, 0.308) 1px solid',
                    width: '100% !important'
                },
                priceStyle: {
                    'font-weight': 'bold',
                    'font-size': '26px',
                    padding: '0px !important',
                    margin: '0px !important'
                },
                buyBtnStyle: {
                    'background-color': `${confirmColor} !important`,
                    color: secondaryColor,
                    height: '55px',
                    width: '100%'
                }
            },
            description: {
                mainStyle: {
                    margin: '10px 0 0 0'
                },
                titleStyle: {
                    'font-weight': 'bold'
                },
                textStyle: {
                    'white-space': 'pre-line'
                }
            },
            noStock: {
                mobile: {
                    name: 'Produto Indisponível',
                    style: {
                        margin: '20px 0 20px 0 ',
                        'font-size': '18px',
                        'color': errorColor
                    },
                    class: null
                },
                name: 'Produto Indisponível',
                style: {
                    margin: '130px 0 60px 0 ',
                    'font-size': '23px',
                    'color': errorColor
                },
                class: null
            },
            searchSection: {
                style: {
                    'border-top': 'solid grey 1px',
                },
                title: {
                    name: 'Produtos Relacionados',
                    style: {
                        'font-size': '20px !important',
                        'font-weight': 'bold'
                    },
                    class: null
                },
                config: {
                    items: 12,
                    displaySize: {
                        sm: 4,
                        md: 2,
                        xl: 2,
                        cols: 6
                    },
                    params: {
                    }
                },
            },
            mobile: {
                mainRowStyle: {
                    padding: '0 5% 0 5%'
                },
                productNameStyle: {
                    'font-weight': '500',
                    'font-size': '20px'
                },
                productNameClass: {

                },
                selectedImgColStyle: {
                },
                availableImgColStyle: {
                    padding: '10px'
                },
                availableImgStyle: {
                },
                brand: {
                    style: {
                        color: 'black',
                        'font-size': '14px',
                        margin: '0px 0 2px 0 !important'
                    },
                    class: null
                },
                ref: {
                    show: true,
                    style: {
                        color: 'black',
                        'font-size': '13px',
                        margin: '0px !important'
                    },
                    class: null
                },
                color: {
                    mainStyle: {
                        'border-top': 'solid 1px rgba(128, 128, 128, 0.384)',
                        'border-bottom': 'solid 1px rgba(128, 128, 128, 0.384)',
                        margin: '34px 0 0 0'
                    },
                    titleStyle: {
                        'font-size': '18px'
                    },
                    titleClass: {

                    },
                    btnStyle: {
                        'box-sizing': 'inherit',
                        'min-width': '0 !important',
                        'width': '32px !important',
                        'height': '32px !important', 'padding': '3px !important',
                        margin: '0 4px 4px 0'
                    },
                    selectedBtnStyle: {
                        'box-shadow': 'inset 0px 0px 10px 2px darkgrey',
                        'box-sizing': 'inherit',
                        'min-width': '0 !important',
                        'width': '30px !important',
                        'height': '30px !important',
                        'padding': '3px !important',
                        margin: '0 6px 6px 0'
                    },
                    btnClass: {

                    }
                },
                size: {
                    mainStyle: {
                        padding: '4px 0 0 14px !important'
                    },
                    titleStyle: {
                    },
                    titleClass: {

                    },
                    btn: {
                        defaultStyle: {
                            'box-sizing': 'inherit',
                            'min-width': '0 !important',
                            'width': '32px !important',
                            'height': '32px !important',
                            'border': 'solid 1px black !important',
                            'padding': '3px !important',
                            margin: '0 4px 0 0',
                            color: 'black',
                            cursor: 'pointer'
                        },
                        defaultClass: {

                        },
                        selectedStyle: {
                            'box-sizing': 'inherit',
                            'min-width': '0 !important',
                            'width': '30px !important',
                            'height': '30px !important',
                            'border': 'solid 2px black !important',
                            'padding': '3px !important',
                            margin: '0 4px 0 0',
                            color: 'black',
                            'font-weight': 'bold'
                        },
                        disabledStyle: {
                            'box-sizing': 'inherit',
                            'min-width': '0 !important',
                            'width': '32px !important',
                            'height': '32px !important',
                            'border': 'solid 1px  rgba(128, 128, 128, 0.201) !important',
                            'padding': '3px !important',
                            margin: '0 4px 0 0',
                            color: 'rgba(128, 128, 128, 0.541)'
                        }
                    }
                },
                priceAndBuy: {
                    installments: merchantInfo.installment,
                    installmentStyle: {

                    },
                    mainStyle: {
                        margin: '30px 0 0 0 !important',
                        'border-top': ' rgba(128, 128, 128, 0.308) 1px solid',
                        'border-bottom': ' rgba(128, 128, 128, 0.308) 1px solid',
                        width: '100% !important'
                    },
                    priceStyle: {
                        'font-weight': 'bold',
                        'font-size': '26px',
                        padding: '0px !important',
                        margin: '0px !important'
                    },
                    buyBtnStyle: {
                        'background-color': `${confirmColor} !important`,
                        color: secondaryColor,
                        height: '55px',
                        width: '100%'
                    }
                },
                description: {
                    mainStyle: {
                        margin: '10px 0 0 0'
                    },
                    titleStyle: {
                        'font-weight': 'bold'
                    },
                    textStyle: {
                        'white-space': 'pre-line'
                    }
                },
            },
        },
        cart: {
            cartDialog: {
                dialog: {
                    style: {
                        background: 'none !important',
                    },
                    class: {

                    },
                    maxWidth: '700'

                },
                card: {
                    style: {
                        // overflow: 'hidden',
                        height: '100%'
                    },
                    class: {

                    }
                },
                headerRow: {
                    style: {
                        width: 'auto',
                        padding: '0 15px 0 15px',
                        'border-bottom': 'solid rgba(128, 128, 128, 0.148) 1px'

                    }
                },
                titleCol: {
                    title: 'Minha Sacola',
                    style: {
                        'padding-bottom': '0px',
                    },
                    textClass: '',
                    textStyle: {
                        color: 'grey',
                        'font-weight': 'bold'

                    }
                },
                list: {
                    rowStyle: {
                        width: '100%',
                    },
                    rowClass: null,
                    productStyle: {

                        'max-height': '40vh',
                        'overflow-y': 'auto',
                        'overflow-x': 'hidden',
                    },
                    img: {
                        cols: 3,
                        sm: 2,
                        colStyle: {
                            padding: '18px 0 18px 0  '
                        },
                        imgStyle: {
                            height: '100px',
                            width: 'auto'
                        }
                    },
                    information: {
                        cols: 4,
                        sm: 6,
                        nameStyle: {
                            'font-size': '14px',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        nameClass: {

                        },
                        colorStyle: {
                            'font-size': '14px',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        colorClass: {

                        },
                        sizeStyle: {
                            'font-size': '14px',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        sizeClass: {

                        },
                        qtdStyle: {
                            'font-size': '14px',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        qtdClass: {

                        }
                    },
                    qtd: {
                        input: false,
                        cols: 5,
                        sm: 3,
                        labelStyle: {
                            margin: '0px !important',
                        },
                        inputStyle: {
                            'max-width': '110px',
                        },
                    },
                    price: {
                        cols: 5,
                        sm: 3,
                        colAlign: 'right',
                        totalStyle: {
                            'font-size': '16px !important',
                            'font-weight': 'bold !important',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        totalClass: {

                        },
                        eachStyle: {
                            'font-size': '12px !important',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        eachClass: {

                        }
                    },
                    removeButton: {
                        style: {
                            'text-decoration': 'underline',
                            'font-size': '12px'
                        }
                    }
                },

                bottomRow: {
                    style: {
                        'border-top': 'solid rgba(128, 128, 128, 0.148) 1px',
                        'background-color': 'white'
                    },
                    subTotal: {
                        cols: 12,
                        sm: 11,
                        align: 'right',
                        text: {
                            class: null,
                            style: {
                                'font-size': '18px',
                                margin: '0px !important',
                                padding: '0px !important',
                                'background-color': 'white'
                            }
                        }
                    },
                    backToBuys: {
                        cols: 12,
                        sm: 4,
                        align: 'center',

                        color: cancelColor,
                        class: '',

                        style: {
                            color: 'white',
                            'background-color': 'white'
                        }
                    },
                    goToCart: {
                        cols: 12,
                        sm: 4,
                        align: 'center',

                        color: confirmColor,
                        class: '',

                        style: {
                            color: 'white',

                        }
                    }
                },
                noItemIcon: {
                    style: {
                        'font-size': '64px',
                        color: iconColor
                    },
                    class: 'mdi mdi-cart-remove',
                },
                emptyText: {
                    style: {

                    },
                    text: 'Carrinho Vazio!!',
                },
                emptyButton: {
                    style: {
                        'background-color': '#e57373'
                    },
                    text: 'Voltar',
                }
            },
            cartScreen: {
                mainStyle: {
                    position: 'relative',
                    'max-width': '1200px !important',
                    margin: '30px auto 0 auto'
                },
                title: {
                    name: 'Meu Carrinho',
                    style: {
                        padding: '12px 0 0 0 ',
                        'font-size': '22px',
                        'border-bottom': 'solid grey 1px'
                    },
                    class: null
                },
                btnTop: {
                    show: true,
                    style: {
                        float: 'right',
                        'background-color': confirmColor,
                        color: 'white'
                    }
                },
                list: {
                    row: {
                        style: {
                            'border-bottom': 'solid rgba(128, 128, 128, 0.26) 1px',
                            'max-width': '1200px !important',
                            margin: '0px auto 0 auto'
                        },
                        class: null
                    },
                    img: {
                        cols: 2,
                        sm: 1,
                        colStyle: {
                            padding: '12px 0 12px 0',
                            margin: '0px',
                            'max-height': '140px !important'
                        },
                        imgStyle: {
                            height: '100px',
                            width: 'auto'
                        },
                    },
                    name: {
                        cols: 9,
                        sm: 4,
                        md: 3,
                        alignSelf: 'center',
                        colStyle: {

                        },
                        title: {
                            style: {
                                'font-size': '14px',
                                padding: '0px !important',
                                margin: '0px !important',
                                'font-weight': 'bold'
                            },
                            class: null
                        },
                        price: {
                            cols: 2,
                            colAlign: 'right',
                            totalStyle: {
                                'font-size': '16px !important',
                                'font-weight': 'bold',
                                padding: '0px !important',
                                margin: '0px !important'
                            },
                            totalClass: {

                            },
                            eachStyle: {
                                'font-size': '12px !important',
                                padding: '0px !important',
                                margin: '0px !important'
                            },
                            eachClass: {

                            }
                        },
                        removeButton: {
                            style: {
                                'text-decoration': 'underline',
                                'font-size': '12px'
                            }
                        }
                    },
                    info: {
                        alignSelf: 'center',
                        cols: 6,
                        sm: 4,
                        md: 4,
                        color: {
                            cols: 12,
                            md: 6,
                            alignSelf: 'center',
                            style: {
                                'font-size': '14px',
                                padding: '0px !important',
                                margin: '0px !important'
                            },
                            class: null

                        },
                        size: {
                            cols: 12,
                            md: 6,
                            alignSelf: 'center',
                            style: {
                                'font-size': '14px',
                                padding: '0px !important',
                                margin: '0px !important'
                            },
                            sizeClass: null
                        },
                    },
                    amount: {
                        cols: 6,
                        sm: 4,
                        md: 2,
                    },
                    price: {
                        cols: 6,
                        sm: 3,
                        md: 2,
                        colAlign: 'right',
                        totalStyle: {
                            'font-size': '16px !important',
                            'font-weight': 'bold',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        totalClass: {

                        },
                        eachStyle: {
                            'font-size': '12px !important',
                            padding: '0px !important',
                            margin: '0px !important'
                        },
                        eachClass: {

                        }
                    },
                    removeButton: {
                        style: {
                            'text-decoration': 'underline',
                            'font-size': '12px'
                        }
                    }
                },
                resume: {
                    row: {
                        style: {
                            margin: '35px 0 20px 0',
                            border: 'solid 1px rgba(128, 128, 128, 0.348)'
                        }
                    },
                    freight: {
                        col: {
                            cols: 12,
                            sm: 7,
                            align: 'left',
                            style: {
                                color: 'grey',
                                'font-weight': 'bold',
                                'font-size': '22px',
                                'border-right': '1px solid lightgrey'
                            },
                        },
                        title: {
                            class: null,
                            style: {

                            }
                        },
                        input: {
                            cols: '12',
                            sm: '12',

                            color: inputColor,
                        },
                        checkCepLink: {
                            text: 'Não sei o meu CEP',

                            style: {
                                color: 'black',
                                'font-size': '12px',
                                margin: '0px !important'
                            }
                        },
                        radioGroup: {
                            alignSelf: 'center',
                            cols: '12',
                            sm: '7',

                            color: inputColor,
                            class: 'mt-2',
                            style: {
                                'font-size': '12px !important'
                            }
                        },
                        otherCepLink: {
                            text: 'Calcular com outro CEP',

                            style: {
                                color: 'black',
                                'font-size': '12px !important',
                                margin: '0px !important',
                                'text-decoration': 'underline'
                            }
                        }
                    },
                    info: {
                        col: {
                            cols: 12,
                            sm: 5,
                            align: 'right',
                            style: {
                            }
                        },
                        resume: {
                            style: {
                                color: 'grey',
                                'font-weight': 'bold',
                                'font-size': '22px'
                            },
                            class: null
                        },
                        subtotal: {
                            style: {
                                margin: '0px !important'
                            },
                            class: null
                        },
                        freight: {
                            style: {
                            },
                            class: null
                        },
                        total: {
                            style: {
                                color: 'black',
                                'font-size': '22px',
                                margin: '5px 0 0 0',
                                'font-weight': 'bold'
                            },
                            class: null
                        },
                        installments: {
                            show: true,
                            installments: merchantInfo.installment,
                            style: {
                                margin: '0px',
                                color: 'grey',
                                'font-weight': 'bold',
                                'font-size': '12px'
                            }

                        }
                    }
                },

                btnBottom: {
                    show: true,
                    style: {
                        'background-color': confirmColor,
                        color: 'white',
                        width: '250px',
                        height: '45px'
                    }
                },

                noItemIcon: {
                    style: {
                        'font-size': '64px',
                        color: iconColor
                    },
                    class: 'mdi mdi-cart-remove',
                },
                emptyText: {
                    text: 'Seu carrinho está vazio!!',
                    style: {
                        color: iconColor
                    }
                },
                emptyButton: {
                    text: 'Voltar às compras',
                    style: {
                        'background-color': cancelColor,
                        color: 'white'
                    }
                }
            }
        },
        login: {
            outterRowAlign: 'center',
            loginCol: {
                align: 'center',
                cols: '11',
                sm: '6',

                style: {
                    'max-width': '500px'
                }

            },
            title: {
                class: 'text-start mt-5 mb-3',
                text: 'Iniciar Sessão',
            },
            email: {
                class: 'default-size',
                color: inputColor,
                label: 'Email'
            },
            password: {
                class: 'default-size',
                color: inputColor,
                label: 'Password'
            },
            forgotPassword: {
                style: {
                    top: '-19px',
                    right: '11px',
                    position: 'absolute',
                    'font-size': '13px',
                    'color': 'blue',
                },
                class: 'text-right',
                text: 'Esqueci minha Senha',
            },
            loginBtn: {
                style: {
                    width: '100%',
                    'background-color': mainColor,
                    color: secondaryColor
                },
                class: 'btn-go default-size acess-btn mt-5',
            },
            registerLink: {
                style: {
                    'font-size': '14px'
                },
                class: 'mt-3',

                quote: 'Não tem uma conta?',
                text: 'Cadastrar'
            },
            error: {
                text: '',
                style: {
                    'margin-top': '-20px',
                },
            }
        },
        register: {
            justify: 'center',

            cols: 11,
            sm: 8,
            xl: 4,

            title: {
                color: mainColor,
                class: 'white--text',

                text: 'Criar Conta',
            },

            company: {
                show: true,

                color: inputColor,
                label: 'Empresa',

                isCompany: false
            },
            name: {
                show: true,

                color: inputColor,
                label: 'Nome Completo'
            },
            fantasyName: {
                show: true,

                color: inputColor,
                label: 'Nome Fantasia'
            },
            companyName: {
                show: true,

                color: inputColor,
                label: 'Razão Social'
            },
            phone: {
                show: true,

                color: inputColor,
                label: 'Telefone'
            },
            cpf: {
                show: true,

                color: inputColor,
                label: 'CPF'
            },
            cnpj: {
                show: true,

                color: inputColor,
                label: 'CNPJ'
            },
            birthday: {
                show: true,

                color: inputColor,
                label: 'Data de Nascimento *',
            },
            gender: {
                show: true,

                color: inputColor,
                label: 'Sexo *',
            },
            email: {
                show: true,

                color: inputColor,
                label: 'Email'
            },
            password: {
                show: true,

                color: inputColor,
                label: 'Senha'
            },
            passwordConfirmation: {
                show: true,

                color: inputColor,
                label: 'Confirmar Senha'
            },

            finishBtn: {
                cols: 8,
                sm: 6,

                style: {
                    'background-color': mainColor,
                    color: secondaryColor
                },
                class: 'btn-go default-size acess-btn mt-5',

                text: 'Criar Conta',
                icon: 'mdi-check'
            },

            error: {
                text: '',
                style: {
                },
            }
        },
        account: {
            cols: 9,

            tabs: {
                cols: 2,

                slider: {
                    style: {
                        'background-color': 'grey'
                    },
                    size: 10
                },
                activeStyle: {
                    'background-color': mainColor,
                    color: 'white !important',
                },
                regularStyle: {
                    'background-color': 'white !important',
                    color: 'black !important',
                },
                mobile: {
                    slider: {
                        color: 'grey',
                        size: 10
                    },

                    activeStyle: {
                        'background-color': mainColor,
                        color: 'white !important',
                        height: '40px !important'
                    },
                    regularStyle: {
                        'background-color': 'white !important',
                        color: 'black !important',
                        height: '40px !important'
                    }
                },
            },
            content: {
                cols: 10,
            },
            people: {
                title: {
                    elevation: 0,

                    style: {
                        'background-color': mainColor,
                        color: 'white'
                    },
                    class: '',

                    text: 'Dados da Conta',
                },


                email: {
                    cols: 12,
                    sm: 12,
                    alignSelf: 'center',

                    disabled: true,

                    label: 'Email *',
                    color: inputColor,
                    style: {
                        color: 'grey'
                    },
                    class: ''
                },
                companySwitch: {
                    cols: 12,
                    sm: 12,

                    disabled: true,

                    label: 'Empresa',
                    color: inputColor,
                    style: {
                        margin: '0 !important'
                    },
                    class: ''
                },
                name: {
                    cols: 12,
                    sm: 4,
                    alignSelf: 'center',

                    disabled: false,

                    label: 'Nome Completo *',
                    color: inputColor,
                    style: {
                        color: 'grey'
                    },
                    class: '',

                    errorMessage: ''
                },
                companyName: {
                    cols: 12,
                    sm: 4,
                    alignSelf: 'center',

                    disabled: false,

                    label: 'Razão Social *',
                    color: inputColor,
                    style: {
                        color: 'grey'
                    },
                    class: '',

                    errorMessage: ''
                },
                birthday: {
                    cols: 12,
                    sm: 4,
                    alignSelf: 'center',

                    disabled: false,

                    label: 'Nascimento',
                    color: inputColor,
                    style: {
                        color: 'grey'
                    },
                    class: '',

                    errorMessage: ''
                },
                phone: {
                    cols: 12,
                    sm: 4,
                    alignSelf: 'center',

                    disabled: false,

                    label: 'Telefone (c/ DDD) *',
                    color: inputColor,
                    style: {
                        color: 'grey'
                    },
                    class: '',

                    errorMessage: ''
                },
                cpfCnpj: {
                    cols: 12,
                    sm: 4,
                    alignSelf: 'center',

                    disabled: false,

                    label: 'CPF/CNPJ *',
                    color: inputColor,
                    style: {
                        color: 'grey'
                    },
                    class: '',

                    errorMessage: ''
                },
                gender: {
                    cols: 12,
                    sm: 3,
                    alignSelf: 'center',

                    disabled: false,

                    label: 'Sexo *',
                    color: inputColor,
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },

                error: {
                    style: {

                    }
                }
            },
            addresses: {
                title: {
                    elevation: 0,

                    style: {
                        'background-color': mainColor,
                        color: 'white'
                    },
                    class: '',

                    text: 'Endereços',
                },

                input: {
                    color: inputColor
                },

                cep: {
                    cols: 12,
                    sm: 12,
                    alignSelf: '',

                    label: 'Cep',
                    style: {
                        'max-width': '200px'
                    },
                    class: '',

                    errorMessage: ''
                },
                street: {
                    cols: 9,
                    sm: 9,
                    alignSelf: '',

                    label: 'Rua',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                houseNumber: {
                    cols: 3,
                    sm: 3,
                    alignSelf: '',

                    label: 'Nº',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                neighborhood: {
                    cols: 12,
                    sm: 9,
                    alignSelf: '',

                    label: 'Bairro',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                city: {
                    cols: 9,
                    sm: 9,
                    alignSelf: '',

                    label: 'Cidade',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                estate: {
                    cols: 3,
                    sm: 3,
                    alignSelf: '',

                    label: 'UF',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                complement: {
                    cols: 12,
                    sm: 12,
                    alignSelf: '',

                    label: 'Complemento',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                observation: {
                    cols: 12,
                    sm: 12,
                    alignSelf: '',

                    label: 'Observação',
                    style: {
                    },
                    class: '',

                    errorMessage: ''
                },
                saveBtn: {
                    style: {
                        float: 'center',
                        'background-color': confirmColor,
                        color: 'white'
                    },
                    class: 'ml-1 btn-go',

                    text: 'Salvar'
                },

                error: {
                    text: '',
                    style: {

                    }
                },

                divider: {
                    style: {
                        'background-color': 'darkgrey'
                    }
                },

                addBtn: {
                    icon: 'mdi-plus',
                    text: 'adicionar Endereço',
                    style: {
                        'background-color': confirmColor,
                        color: 'white'
                    }
                }
            },
            orders: {
                title: {
                    elevation: 0,

                    style: {
                        'background-color': mainColor,
                        color: 'white'
                    },
                    class: '',

                    text: 'Histórico de Pedidos',
                },
                detailsBtn: {
                    color: mainColor,
                    style: {
                        color: secondaryColor,
                    },
                    class: ''
                },
                backToBuys: {
                    color: cancelColor,
                    style: {
                        color: 'white'
                    },
                    class: ''
                }
            }
        },
        orderDetails: {
            stepper: {
                payBtn: {
                    style: {
                        'background-color': confirmColor,
                        color: 'white'

                    },
                    class: 'mt-3 mb-5'
                },
                step: {
                    color: mainColor,
                }
            },
            deliveryDetails: {
                delivery: {
                    cols: 12,
                    md: 9,

                    style: {

                    },
                    class: '',

                    title: {
                        style: {
                            background: mainColor,
                            color: 'white',
                        },
                        class: '',
                    },
                },
                pricing: {
                    cols: 12,
                    md: 3,

                    style: {

                    },
                    class: '',

                    title: {
                        style: {
                            background: mainColor,
                            color: 'white',
                        },
                        class: '',
                    },
                }
            },
            productDetails: {
                header: {
                    style: {
                        background: mainColor,
                        color: 'white',
                    },

                    product: {
                        cols: 12,
                        sm: 6,
                    },
                    amount: {
                        cols: 3,
                    },
                    totalPrice: {
                        cols: 3,
                    }
                },
                item: {
                    style: {
                        margin: '0',
                        border: 'solid rgba(0, 0, 0, 0.075) 0.1px',
                    },

                    img: {
                        cols: 3,
                        sm: 2,
                    },
                    product: {
                        cols: 9,
                        sm: 4,
                    },
                    amount: {
                        cols: 7,
                        sm: 3
                    },
                    totalPrice: {
                        cols: 5,
                        sm: 3
                    }
                },
                footer: {
                    style: {
                        //'background-color': '#6B869F',
                        'text-transform': 'uppercase',
                    },

                    product: {
                        cols: 7,
                        sm: 9,
                    },
                    totalPrice: {
                        cols: 5,
                        sm: 3,
                    }
                }
            }
        },
        payment: {
            closeOrderModal: {
                input: {
                    color: inputColor
                },
                addressBtn: {
                    style: {
                        background: confirmColor,
                        color: 'white'
                    }
                },
                buyBtn: {
                    style: {
                        'background-color': confirmColor,
                        color: 'white'
                    }
                }
            },
            creditCard: {
                front: {
                    style: {
                        "text-shadow": "black 1px 2px 5px",
                        "box-shadow": "0px 0px 12px 0px grey",
                        "border-radius": "15px",
                        "background-color": mainColor,
                        color: defaultGold
                    }
                },
                back: {
                    style: {
                        "text-shadow": "black 1px 2px 5px",
                        "box-shadow": "0px 0px 12px 0px grey",
                        "border-radius": "15px",
                        "background-color": mainColor,
                        color: defaultGold
                    }
                },
                disabled: {
                    front: {
                        style: {
                            'text-shadow': 'black 1px 2px 5px',
                            'box-shadow': '0px 0px 12px 0px grey',
                            'border-radius': '15px',
                            'background-color': 'lightgrey'
                        }
                    },
                    back: {
                        style: {
                            'text-shadow': 'black 1px 2px 5px',
                            'box-shadow': '0px 0px 12px 0px grey',
                            'border-radius': '15px',
                            'background-color': 'lightgrey'
                        }
                    }
                }
            },
            input: {
                color: mainColor
            },
            payBtn: {
                style: {
                    width: '100%',
                    'background-color': confirmColor,
                    color: 'white'
                },
                class: 'mr-5 mb-5'
            },
            backToBuys: {
                style: {
                    'background-color': cancelColor,
                    color: 'white'
                },
                class: 'mt-5 mb-5'
            }
        },
        footer: {
            mainStyle: {
                position: 'inherit',
                padding: '50px',
                'min-height': '300px',
                'background-color': secondaryColor,
                'margin-top': '20px !important',
                'border-top': '1px solid #924227',
                'border-bottom': '1px solid #924227',
            },
            titleStyle: {
                'font-size': '22px',
                color: 'black',
                'font-weight': 'bold'
            },
            list: {
                align: 'center',
            },
            institucionalList: [
                {
                    name: 'Quem Somos', route: '/quem-somos', style: {
                        'text-decoration': 'none !important',
                        color: 'black',
                        'font-weight': '300',
                        'font-size': '15px'
                    }
                },
                {

                    name: 'Políticas de Trocas', route: '/', style: {
                        'text-decoration': 'none !important',
                        color: 'black',
                        'font-weight': '300',
                        'font-size': '15px'
                    }

                },

                {
                    name: 'Políticas de Entregas', route: '/', style: {
                        'text-decoration': 'none !important',
                        color: 'black',
                        'font-weight': '300',
                        'font-size': '15px'
                    }

                },

                {
                    name: 'Políticas de Privacidade', route: '/', style: {
                        'text-decoration': 'none !important',
                        color: 'black',
                        'font-weight': '300',
                        'font-size': '15px'
                    }

                }
            ],
            contactList: [
                {
                    name: merchantInfo.phone,
                    style: {
                        color: 'black',
                        'font-size': '12px'
                    },
                    icon: 'mdi mdi-phone',

                    iconStyle: {
                        color: iconColor
                    }
                },
                {
                    name: merchantInfo.whatsappNumber,
                    style: {
                        color: 'black',
                        'font-size': '12px'
                    },
                    icon: 'mdi mdi-whatsapp',

                    iconStyle: {
                        color: iconColor,
                        'font-size': '18px'
                    }
                },
                {
                    name: merchantInfo.address,
                    style: {
                        color: 'black',
                        'font-size': '13px'
                    },
                    icon: 'mdi mdi-map-legend',
                    iconStyle: {
                        color: iconColor
                    }
                }
            ],
            logoSession: {
                style: {},
                align: 'center',
                logoSrc: logoAlt,
                logoStyle: {
                    width: '180px'
                },
                midiaLinks: [
                    {
                        icon: 'mdi mdi-instagram',
                        iconStyle: {
                            color: 'black',
                            'font-size': '33px'
                        },
                        href: merchantInfo.instagram
                    },
                    {
                        icon: 'mdi mdi-facebook',
                        iconStyle: {
                            color: 'black',
                            'font-size': '33px'
                        },
                        href: merchantInfo.facebook
                    },
                    {
                        icon: 'mdi mdi-whatsapp',
                        iconStyle: {
                            color: 'black',
                            'font-size': '33px'
                        },
                        href: merchantInfo.whatsappLink
                    },
                ]
            },
            paymentSession: {
                align: 'center',
                color: 'white',

                cards: [
                    {
                        class: '',
                        style: '',
                        src: '/cardsBuySession/card-master.png'
                    },
                    {
                        class: '',
                        style: '',
                        src: '/cardsBuySession/visa.png'
                    },
                    {
                        class: '',
                        style: '',
                        src: '/cardsBuySession/amex.png'
                    },
                    {
                        class: '',
                        style: 'width: 53px !important',
                        src: '/cardsBuySession/hipercard.png'
                    },
                    {
                        class: 'mb-3',
                        style: 'width: 53px !important',
                        src: '/cardsBuySession/elo-white.png'
                    }
                ]
            },
            copyrightSession: {
                copyright: merchantInfo.copyright
            }
        },
        floatingIcon: {

            backToTop: {
                style: {
                    position: "fixed",
                    right: "1%",
                    bottom: "12%",
                    width: "50px",
                    height: "50px",
                    opacity: 0.4,
                    "z-index": 99,
                },
            },

            icon: "/whatsapp.svg",
            link: merchantInfo.whatsappLink,

            style: {
                position: "fixed",
                right: "1%",
                bottom: "3%",
                width: "50px",
                height: "50px",
                "z-index": 99
            }
        },
        dialog: {
            exitDialog: {
                width: 300,
                align: 'center',

                style: {
                    padding: "10px"
                },

                cancelBtn: {
                    width: '100',
                    color: cancelColor,
                    style: {
                        color: 'white'
                    }
                },
                okBtn: {
                    width: '100',
                    color: confirmColor,
                    style: {
                        color: 'white'
                    }
                }
            }
        }
    }
})