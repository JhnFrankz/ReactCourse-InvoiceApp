import { getInvoice } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useState } from "react";

export const InvoiceApp = () => {

    const { id, name, client, company, items: itemsInitial, total } = getInvoice();

    // Un solo estado para todos los inputs del formulario
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsState;

    const [items, setItems] = useState(itemsInitial)

    const [counter, setCounter] = useState(4);

    // Desestructuramos event, luego target para usar name y value
    const onInputChange = ({ target: { name, value } }) => {
        console.log(name);
        console.log([name]);
        console.log(value);
        setFormItemsState({
            // copiamos el estado anterior y le agregamos el nuevo estado
            // es decir, si tenemos productValue: 'hola', priceValue: 'chau', quantityValue: 'adios' y escribimos en el input de producto 'hola' el estado queda productValue: 'hola', priceValue: 'chau', quantityValue: 'adios', productValue: 'hola'
            ...formItemsState,
            [name]: value
            // [name] es la propiedad del objeto que queremos modificar, en este caso product, price o quantity
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