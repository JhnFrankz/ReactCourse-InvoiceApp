import { getInvoice, calculateTotal } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useEffect, useState } from "react";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0,
        },
    },
    company: {
        name: '',
        fiscalNumber: '',
    },
    items: [],
};

export const InvoiceApp = () => {

    const [total, setTotal] = useState(0);
    const [counter, setCounter] = useState(4);
    // useState es un hook que nos permite agregar estado a los componentes funcionales, recibe un parámetro que es el valor inicial del estado y devuelve un array con dos elementos, el primero es el valor del estado y el segundo es una función que nos permite modificar el estado.
    const [invoice, setInvoice] = useState(invoiceInitial);
    const [items, setItems] = useState([])
    const { id, name, client, company } = invoice;

    // useEffect es un hook que nos permite ejecutar código cuando el componente se monta, se desmonta o se actualiza. Recibe dos parámetros, el primero es una función que se ejecuta cuando el componente se monta, se desmonta o se actualiza, el segundo es un array de dependencias, si el array está vacío la función se ejecuta solo cuando el componente se monta, si el array tiene elementos la función se ejecuta cuando el componente se monta y cuando alguno de los elementos del array cambia de valor.
    useEffect(() => {
        const data = getInvoice();
        // al ejecutar getInvoice() nos devuelve un objeto con los datos de la factura, lo guardamos en una constante y luego lo pasamos al estado con setInvoice
        console.log(data);
        setInvoice(data);
        // también pasamos los items al estado porque los necesitamos para mostrarlos en el componente ListItemsView
        setItems(data.items);
    }, []);

    useEffect(() => {
        // console.log('Los items cambiaron');
        setTotal(calculateTotal(items));
    }, [items]);

    // funcion que se ejecuta cuando se envía el formulario de items de la factura
    const handlerAddItems = ({ product, price, quantity }) => {
        // con spread operator copiamos los items que ya tenemos en el estado y agregamos el nuevo item
        setItems([...items, {
            id: counter,
            product: product.trim(),
            price: +price.trim(),
            quantity: parseInt(quantity.trim(), 10),
        }])

        setCounter(counter + 1);
    };

    return (
        <>
            <div className="container">
                <div className="card my-3">
                    <div className="card-header">
                        Ejemplo Factura
                    </div>

                    <div className="card-body">
                        <InvoiceView id={id} name={name} />

                        <div className="row my-3">
                            <div className="col">
                                <ClientView title={"Datos del cliente"} client={client} />
                            </div>

                            <div className="col">
                                <CompanyView title={"Datos de la empresa"} company={company} />
                            </div>
                        </div>

                        <ListItemsView title={"Productos de la factura"} items={items} />
                        <TotalView total={total} />
                        <FormItemsView handler={handlerAddItems} />
                    </div>
                </div>
            </div>
        </>
    );
};