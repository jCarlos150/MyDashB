export class ImpressaoComparacao {

    constructor(dadosParaImpressao, title) {
        this.title = title;
        this.dadosParaImpressao = dadosParaImpressao;
    }

    async PreparaDocumento() {
        const corpoDocumento = this.CriaCorpoDocumento();
        const documento = this.GerarDocumento(corpoDocumento, this.title);
        return documento;
    }

    CriaCorpoDocumento() {
        /*
              let dados = this.dadosParaImpressao
      
              let keys = Object.keys(dados)
              let h = []
              let bd = [];
              keys.map((chave) => {
                  h.push({ text: chave, bold: true, fontSize: 9, margin: [0, 4, 0, 0] },)
                  bd.push({ text: dados[chave], fontSize: 8 },)
              });
              console.log("here")
              console.log(h)
              console.log(bd)
      
              const header = h;
      
              const body = bd;
        */

        //  let dados = this.dadosParaImpressao

        let dados = this.dadosParaImpressao

        let keys = Object.keys(dados)


        //  let h = [];
        let bd = [


        ];

        let h = [

        ]

        for (let i in keys) {
            h.push(`${keys[i]}`)
            let k = keys[i];
            bd.push(`${dados[k]}`)
        }


        const content = [
            h,
            bd
        ]




        /* console.log("aqui")
         console.log(keys)
         console.log(header)
         console.log(body)
 
         */



        /*   


        let keys = Object.keys(dados)

          let h = keys.map((chave) => {
               return [{ text: chave + "", bold: true, fontSize: 9, margin: [0, 4, 0, 0] }]
           }); 

        const header = [
            { text: keys[0], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: keys[1], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: keys[2], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: keys[3], bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        ];
        const body = [

            { text: dados[keys[0]], fontSize: 8 },
            { text: dados[keys[1]], fontSize: 8 },
            { text: dados[keys[2]], fontSize: 8 },
            { text: dados[keys[3]], fontSize: 8 },
        ]

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

        /*  let content = [header, lineHeader];
          content = [...content, ...body];
          return content;
        */


        return content;
    }

    GerarDocumento(corpoDocumento, title) {
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
                    fontSize: 9,
                    table: {
                        columnGap: 4,
                        headerRows: 1,
                        widths: ['*', 100, 100, 100, 100],
                        body: corpoDocumento
                    }
                },

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
                },

            },

        };
        return documento;
    }
}
