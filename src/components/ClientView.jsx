import PropTypes from 'prop-types';

// Usamos { client } para desestructurar el objeto que nos llega por parámetro
// para poder usar sus propiedades directamente sin tener que usar client.name, client.lastName, etc. es decir, sin tener que usar client. cada vez.
// Nos devuelve un objeto con las propiedades name, lastName y address.
export const ClientView = ({ title, client }) => {

    // alias nameClient para name y destructuración de objeto address
    const { name: nameClient, lastName, address: { country, city, street, number } } = client;

    return (
        <>
            <h3>{title}</h3>
            <ul className="list-group">
                <li className="list-group-item active">{nameClient} {lastName}</li>
                <li className="list-group-item">{country} / {city}</li>
                <li className="list-group-item">{street} {number}</li>
            </ul>
        </>
    );
};

ClientView.propTypes = {
    title: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired,
};
