import { RowItemView } from "./RowItemView";
import PropTypes from 'prop-types';

export const ListItemsView = ({ title, items, handlerDeleteItem }) => {

    return (
        <>
            <h4>{title}</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, product, price, quantity }) => (
                        // key={id} es para que React sepa que cada elemento es único y no se repite.
                        <RowItemView
                            key={id}
                            id={id}
                            product={product}
                            price={price}
                            quantity={quantity} 
                            handlerDeleteItem={id => handlerDeleteItem(id)} />
                        // no poner ; luego de la llave de la función map
                        // ya que da un Warning en la consola del navegador.
                    ))}
                </tbody>
            </table>
        </>
    );
};

ListItemsView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};