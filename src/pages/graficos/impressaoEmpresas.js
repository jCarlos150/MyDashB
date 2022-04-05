


export class ImpressaoPassagens {

    constructor(dadosParaImpressao, title, total, media) {
        this.title = title;
        this.total = total;
        this.media = media;
        this.dadosParaImpressao = dadosParaImpressao;
    }

    async PreparaDocumento() {
        const corpoDocumento = this.CriaCorpoDocumento();
        const documento = this.GerarDocumento(corpoDocumento, this.title, this.total, this.media);
        return documento;
    }

    CriaCorpoDocumento() {

        let dados = this.dadosParaImpressao[0]

        let keys = Object.keys(dados);

        let h = [];
        let b = [];

        for (let i in keys) {
            h.push({ text: keys[i], bold: true, fontSize: 9, margin: [0, 4, 0, 0] })
            b.push({ text: dados[keys[i]], fontSize: 8 })
        }
        const header = h;

        const body = b;
        console.log("testeImpressão")
        console.log(keys);
        console.log(h)
        console.log(b)


        /*   const header = [
               { text: keys[0], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
               { text: keys[1], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
           ];
           const body = this.dadosParaImpressao.map((prod) => {
               return [
                   { text: prod[keys[0]], fontSize: 8 },
                   { text: prod[keys[1]], fontSize: 8 },
   
   
               ];
           });
           console.log("aqui")
           console.log(header)
           console.log(body)
     

        
        const lineHeader = [
            {
                text:
                    '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                alignment: 'center',
                fontSize: 0,
                colSpan: 3,

            },
            {},
            {},
        ];

        */

        let content = [header, body];
        return content;
    }

    GerarDocumento(corpoDocumento, title, total, media) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: "" + title, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'Borders',
                    table: {
                        headerRows: 1,
                        widths: ['*', 100, 100],

                        body: corpoDocumento
                    }
                },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 100, 100],
                        body: [
                            [{ text: "Total: " + total, style: 'reportName' }],
                            [{ text: "Media: " + media, style: 'reportName' }]
                        ]
                    }
                }
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'noBorders',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© Relatório',
                                        fontSize: 7,
                                        alignment: 'center',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'left',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }
}

export class ImpressaoEmpresas {

    constructor(dadosParaImpressao, title, total, media) {
        this.title = title;
        this.total = total;
        this.media = media;
        this.dadosParaImpressao = dadosParaImpressao;
    }

    async PreparaDocumento() {
        const corpoDocumento = this.CriaCorpoDocumento();
        const documento = this.GerarDocumento(corpoDocumento, this.title, this.total, this.media);
        return documento;
    }

    CriaCorpoDocumento() {

        let dados = this.dadosParaImpressao[0]

        let dados2 = this.dadosParaImpressao

        let keys = Object.keys(dados);

        let h = [];
        // let b = [];

        for (let i in keys) {
            // h.push({ text: keys[i], bold: true, fontSize: 9, margin: [0, 4, 0, 0] })
            h.push(keys[i])
            // b.push({ text: dados[keys[i]], fontSize: 8 })
        }
        const header = h;

        const body = dados2
        console.log("testeImpressão")
        console.log(keys);
        console.log(body)
        // console.log(b)

        /*   const header = [
               { text: keys[0], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
               { text: keys[1], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
           ];
           const body = this.dadosParaImpressao.map((prod) => {
               return [
                   { text: prod[keys[0]], fontSize: 8 },
                   { text: prod[keys[1]], fontSize: 8 },
   
   
               ];
           });
           console.log("aqui")
           console.log(header)
           console.log(body)
     

        
        const lineHeader = [
            {
                text:
                    '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                alignment: 'center',
                fontSize: 0,
                colSpan: 3,

            },
            {},
            {},
        ];

        */

        let content = [header, body];
        return content;
    }

    GerarDocumento(corpoDocumento, title, total, media) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: "" + title, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'Borders',
                    table: {
                        headerRows: 1,
                        widths: ['*', 100, 100],

                        body: corpoDocumento
                    }
                },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 100, 100],
                        body: [
                            [{ text: "Total: " + total, style: 'reportName' }],
                            [{ text: "Media: " + media, style: 'reportName' }]
                        ]
                    }
                }
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'noBorders',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© Relatório',
                                        fontSize: 7,
                                        alignment: 'center',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'left',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }
}
















