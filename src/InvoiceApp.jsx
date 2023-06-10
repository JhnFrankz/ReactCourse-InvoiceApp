import { getInvoice } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useEffect, useState } from "react";

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

    // useState es un hook que nos permite agregar estado a los componentes funcionales, recibe un parámetro que es el valor inicial del estado y devuelve un array con dos elementos, el primero es el valor del estado y el segundo es una función que nos permite modificar el estado.
    const [invoice, setInvoice] = useState(invoiceInitial);

    const [items, setItems] = useState([])

    // useEffect es un hook que nos permite ejecutar código cuando el componente se monta, se desmonta o se actualiza. Recibe dos parámetros, el primero es una función que se ejecuta cuando el componente se monta, se desmonta o se actualiza, el segundo es un array de dependencias, si el array está vacío la función se ejecuta solo cuando el componente se monta, si el array tiene elementos la función se ejecuta cuando el componente se monta y cuando alguno de los elementos del array cambia de valor.
    useEffect(() => {
        const data = getInvoice();
        // al ejecutar getInvoice() nos devuelve un objeto con los datos de la factura, lo guardamos en una constante y luego lo pasamos al estado con setInvoice
        console.log(data);
        setInvoice(data);
        // también pasamos los items al estado porque los necesitamos para mostrarlos en el componente ListItemsView
        setItems(data.items); 
    }, [])

    const { id, name, client, company, items: itemsInitial, total } = invoice;

    // un solo estado para todos los inputs del formulario
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsState;

    const [counter, setCounter] = useState(4);

    // Desestructuramos event, luego target para usar name y value
    const onInputChange = ({ target: { name, value } }) => {
        // console.log(name);
        // console.log(value); 
        setFormItemsState({
            // copiamos el estado anterior y le agregamos el nuevo estado
            // es decir, si tenemos productValue: 'hola', priceValue: 'chau', quantityValue: 'adios' y escribimos en el input de producto 'hola' el estado queda productValue: 'hola', priceValue: 'chau', quantityValue: 'adios', productValue: 'hola'
            ...formItemsState,
            [name]: value
            // [name] es la propiedad del objeto que queremos modificar, en este caso product, price o quantity (del name="" de html), las llaves son para que se interprete como una variable y no como un string
        });
    };

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        // hacemos una copia del array de items y le agregamos el nuevo item al final del array.
        // ponemos el key en 4 porque ya tenemos 3 items en el array y product: productValue, price: priceValue, quantity: quantityValue porque son los valores que tenemos en los estados.

        if (product.trim().length <= 1) return;
        if (price.trim().length <= 1) return;
        if (isNaN(price.trim())) {
            alert('Error, el precio no es un número');
            return;
        }
        if (quantity.trim().length < 1) {
            alert('Error, la cantidad tiene que ser mayor a 0');
            return;
        }
        if (isNaN(quantity.trim())) {
            alert('Error, la cantidad no es un número');
            return;
        }

        setItems([...items, {
            id: counter,
            product: product.trim(),
            price: +price.trim(),
            quantity: parseInt(quantity.trim(), 10),
        }])

        setFormItemsState({
            product: '',
            price: '',
            quantity: '',
        });

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

                        <form className="w-50" action="" onSubmit={onInvoiceItemsSubmit}>
                            <input
                                type="text"
                                name="product"
                                value={product}
                                placeholder="Producto"
                                className="form-control m-3"
                                onChange={onInputChange} />
                            <input type="text"
                                name="price"
                                value={price}
                                placeholder="Precio"
                                className="form-control m-3"
                                onChange={event => onInputChange(event)} />
                            <input type="text"
                                name="quantity"
                                value={quantity}
                                placeholder="Cantidad"
                                className="form-control m-3"
                                onChange={onInputChange} />

                            <button
                                type="submit"
                                className="btn btn-primary m-3">
                                Nuevo Item
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};