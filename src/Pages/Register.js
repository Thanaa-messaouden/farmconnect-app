import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import Offline from '../Pages/Offline';
import LoginComponent from "./Login";
import { useNavigate } from "react-router-dom";

const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", 
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", 
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", 
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", 
  "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", 
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", 
  "Ghardaïa", "Relizane", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah",
  "In Guezzam", "Touggourt", "Djanet", "El M'Ghaier", "El Meniaa", "Timimoun"
];

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [idUser, setidUser] = useState("");
  const [age, setAge] = useState(0); // Initialiser avec une valeur par défaut
  const [ville, setVille] = useState(""); // Utilisez la liste des wilayas
  const [justificatif, setJustificatif] = useState(null); // Les données Blob peuvent être nulles initialement
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState(""); // Ne pas stocker les mots de passe en texte brut
  const [error, setError] = useState(null); // État pour gérer les erreurs lors de l'inscription
  const [successMessage, setSuccessMessage] = useState(""); // État pour gérer le message de réussite
  const [showFileInput, setShowFileInput] = useState(false); // État initial pour la visibilité de l'entrée de fichier
  const [profession, setProfession] = useState(""); // État pour stocker la profession
  const [specialite, setSpecialite] = useState(""); // État pour stocker la spécialité de l'ingénieur
  const [showLoginForm, setShowLoginForm] = useState(false); // État pour afficher le formulaire de connexion

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const handleFileChange = (e) => {
    setJustificatif(e.target.files[0]);
  };

  const handleProfessionChange = (e) => {
    const selectedProfession = e.target.value;
    setProfession(selectedProfession);
    setShowFileInput(["commerçant", "agriculteur", "ingenieur"].includes(selectedProfession));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Code pour inscrire l'utilisateur avec Firebase
    // Utilisez les valeurs des états pour créer un nouvel utilisateur dans Firebase
  };

  return (
    <>
      {!isOnline && <Offline />}
      {showLoginForm ? (
        <LoginComponent />
      ) : (
        <div className="formWrapper" style={{ marginTop: '-80px' }}>
          <span className="logo">{t("registration")}</span>
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSignUp}>
            <input type="text" value={idUser} onChange={(e) => setidUser(e.target.value)} placeholder={t("username")} required />
            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} placeholder={t("Age")} required />
            <select value={ville} onChange={(e) => setVille(e.target.value)} required >
              <option value="">{t("City")}</option>
              {wilayas.map((wilaya, index) => (
                <option key={index} value={wilaya}>{wilaya}</option>
              ))}
            </select>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("email")} required />
            <input type="password" value={passwordHash} onChange={(e) => setPasswordHash(e.target.value)} placeholder={t("password")} required />
            <PasswordStrengthBar password={passwordHash} />
            <select value={profession} onChange={handleProfessionChange} required>
              <option value="">{t("Select a profession")}</option>
              <option value="commerçant">{t("merchant")}</option>
              <option value="agriculteur">{t("farmer")}</option>
              <option value="ingenieur">{t("ingénieur Agricole")}</option>
              <option value="consomateur">{t("Consumer")}</option>
            </select>
            {showFileInput && (
              <div>
                <label>{t("Insert your file : ")}
                  <input type="file" onChange={handleFileChange} required />
                </label>
              </div>
            )}
            {profession === "ingenieur" && (
              <div>
                <label>{t("Speciality : ")}
                  <input type="text" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
                </label>
              </div>
            )}
            <button>{t("register")}</button>
            <p>
              Vous avez déjà un compte ?{" "}
              <button onClick={() => setShowLoginForm(true)} style={{ border: 'none', backgroundColor: 'transparent', color: 'red', fontWeight: 'bold', fontSize: '15px' }}>Se connecter</button>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;
