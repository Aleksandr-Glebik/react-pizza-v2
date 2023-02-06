import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { typeNames } from './PizzaBlock';
import axios from 'axios';

type PizzaType = {
  name: string
  imageUrl: string
  price: number
  types: string[]
  sizes: string[]
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<PizzaType>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63d776045c4274b136f4ac47.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Пицца не найдена');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return (
      <div className="pizza-block-wrapper">
        <div className="pizza-block">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <h4 className="pizza-block__title">{pizza.name}</h4>
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <div className="pizza-block__selector">
          <ul>
            {pizza.types.map((item, ind) => (
              <li key={`${item}_${ind}`}>{typeNames[+item]}</li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((item, ind) => (
              <li key={`${item}_${ind}`}>{item} см.</li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__price" style={{ marginTop: '20px' }}>
          от {pizza.price} ₽
        </div>
        <Link to="/" className="button button--outline go-back-btn" style={{ marginTop: '20px' }}>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
}

export default FullPizza;
