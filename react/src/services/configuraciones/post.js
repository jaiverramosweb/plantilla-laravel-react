import axiosClient from "../../axios-client"

export const post = ( name, valor ) => {

    // return { name, valor }

    axiosClient.post('/configuracion', {
        name,
        valor
    }).then(({data}) => {
        return data
    }).catch( e => {
        return 'Ocurrio un error'
    })
}