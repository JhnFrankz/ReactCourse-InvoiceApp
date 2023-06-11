import { useEffect, useState } from "react";

export const FormItemsView = ({ handler }) => {

    // un solo estado para todos los inputs del formulario
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsState;

    useEffect(() => {
        // console.log('El precio cambió');
    }, [price]);

    useEffect(() => {
        // console.log('El formItemsState cambió');
    }, [formItemsState]);

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

        // esta función la pasamos como prop desde InvoiceApp, y la ejecutamos acá para que se ejecute en el padre y no en el hijo (porque el estado está en el padre), es decir, cuando se envie el formulario se ejecuta la función que está en el padre (que hace el push al array de items)
        handler(formItemsState);

        setFormItemsState({
            product: '',
            price: '',
            quantity: '',
        });
    };

    return (
        <>
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
        </>
    )
};