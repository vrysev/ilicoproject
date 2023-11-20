// YourTableComponent.jsx

import React from 'react';
import './Table.css'
const Table = ({ orders , fakturas }) => {
    return (
        <div>
            <h1>Order Details</h1>
            <table>
                <thead>
                <tr>
                    <th>Uživatel</th>
                    <th>Kód</th>
                    <th>Kontakt Jméno</th>
                    <th>Fakturační Údaje</th>
                    <th>Forma Dopravy</th>
                    <th>Způsob Platby</th>
                    <th>Stav</th>
                    <th>Položky</th>
                    <th>Celková Cena Objednávky</th>
                    <th>Faktura</th>
                </tr>
                </thead>
                <tbody>
                {orders?.length > 0  && orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.uzivatel}</td>
                        <td>{order.kod}</td>
                        <td>{order.kontaktJmeno}</td>
                        <td>
                            {order.mesto ? `Město: ${order.mesto}, ` : ''}
                            {order.stat  ? `Stát:  ${order.stat},  ` : ''}
                            {order.ulice ? `Ulice: ${order.ulice}, ` : ''}
                            {order.psc   ? `PSČ:   ${order.psc},   ` : ''}
                            {order.ic    ? `IČ:    ${order.ic},    ` : ''}
                            {order.dic   ? `DIČ:   ${order.dic},   ` : ''}
                        </td>
                        <td>{order.formaDopravy}</td>
                        <td>{order.formaUhradyCis}</td>
                        <td>{order.stavUzivK}</td>
                        <td>
                            <ul>
                                {order.položky?.map(item => (
                                    <li key={item.kod}>{item.kod} - {item.nazev}</li>
                                ))}
                            </ul>
                        </td>
                        <td>{order.sumCelkem}</td>
                        <td>
                            {/* Check if there is an associated invoice before rendering the download link */}
                            {fakturas && (
                                <>
                                    {fakturas.find((faktura) => faktura.varSym === order.varSym) ? (
                                        <a href={`https://demo.flexibee.eu/v2/c/demo/faktura-vydana/${fakturas.find((faktura) => faktura.varSym === order.varSym).id}.pdf?limit=0&report-name=fakturaKB$$SUM&report-lang=cs`} target="_blank" rel="noopener noreferrer">
                                            Download Faktura
                                        </a>
                                    ) : (
                                        "No Invoice"
                                    )}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
