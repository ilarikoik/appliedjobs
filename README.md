# Työnhaun Seuranta - Web-sovellus

[1 minuutin esittely video](https://www.youtube.com/watch?v=FD-V9NmptSc)

Tämä on Next.js-pohjainen web-sovellus, jonka avulla käyttäjät voivat seurata työnhakuprosessiaan. Sovelluksessa voi:
- Rekisteröityä ja kirjautua sisään
- Lisätä ja hallita työnhakuihin liittyviä tietoja
- Tallentaa työpaikkojen tietoja SQL Server -tietokantaan

## 🔧 Teknologiat

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) 
- [SQL Server](https://www.microsoft.com/en-us/sql-server)
  
## 🚀 Toiminnot

- Käyttäjän rekisteröinti ja sisäänkirjautuminen
- Työpaikan tietojen lisääminen (työnantaja, tehtävän nimi, hakupäivä, tilanne jne.)
- Työhakemusten listaaminen, muokkaaminen ja poistaminen
- SQL Server -tietokanta tietojen tallennukseen

## 🗃️ Tietokantarakenne
```sql
CREATE TABLE app_user (
  id INT PRIMARY KEY IDENTITY,
  name NVARCHAR(100),
  password_hash NVARCHAR(255)
);

CREATE TABLE jobs_applied (
  id INT PRIMARY KEY IDENTITY,
  app_user_id INT FOREIGN KEY REFERENCES app_user(id),
  job_employee NVARCHAR(255),
  job_role NVARCHAR(255),
  job_applied_date DATE,
  job_status NVARCHAR(100),
  job_link NVARCHAR(250)
);
```

## 🛠️ Asennus
  git clone https://github.com/ilarikoik/appliedjobs.git
  cd appliedjobs


npm install


Luo .env tiedosto app juureen:
  DATABASE_HOST = 
  DATABASE_USER =
  DATABASE_PASSWORD =
  DATABASE_NAME =

npm run dev


Sovellus on nyt käytettävissä osoitteessa: http://localhost:3000
