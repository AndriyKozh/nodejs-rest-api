const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/users");

/*  Виводить токен з заголовка та :
1. Провіряє валідність токена (типу то що ми його видалили і він не минув)
2. Виводить з токенна id, знаходить користувача вбазі даних та прикріпляє його до запросу (req.user)

*/

/* 
1. Вивести з заголовків запиту вміст Authorization.
2. розділити його на 2 слова: bearer та токен
3. Перевірити рівність першого слова "Bearer".
4. Перевіряємо валідність другого слова(токен)
5. Якщо токен валідний - витягнути з ньго ID  і знайти користувача в базі з таким id
6. Якщо знайшли користувача з таким id  - його потрібно прикріпити до запиту (обєкт req)


*/

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await Users.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
