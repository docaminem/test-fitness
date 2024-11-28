document.addEventListener("DOMContentLoaded", function() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>Programme Musculation et Régime</h1>
      <select id="language">
        <option value="fr">Français</option>
        <option value="ar">دارجة</option>
      </select>
    </header>
    <main>
      <div>
        <h2>Calculateur de Calories</h2>
        <form id="calorie-form">
          <input type="number" name="age" placeholder="Âge" required />
          <select name="sex">
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
          <input type="number" name="weight" placeholder="Poids (kg)" required />
          <input type="number" name="height" placeholder="Taille (cm)" required />
          <select name="activityLevel">
            <option value="1.2">Sédentaire</option>
            <option value="1.375">Légèrement actif</option>
            <option value="1.55">Modérément actif</option>
            <option value="1.725">Très actif</option>
            <option value="1.9">Super actif</option>
          </select>
          <button type="submit">Calculer</button>
        </form>
        <div id="calorie-result"></div>
      </div>
      <div>
        <h2>Suivi de Poids</h2>
        <form id="weight-form">
          <input type="number" name="initialWeight" placeholder="Poids initial (kg)" required />
          <input type="number" name="goalWeight" placeholder="Objectif de poids (kg)" required />
          <button type="submit">Calculer Objectif</button>
        </form>
        <div id="weight-result"></div>
      </div>
      <div>
        <h2>Programme de Musculation et Régime</h2>
        <ul id="program-list"></ul>
      </div>
    </main>
  `;

  // Changement de langue
  const languageSelect = document.getElementById('language');
  languageSelect.addEventListener('change', function() {
    const language = languageSelect.value;
    if (language === 'ar') {
      document.documentElement.lang = 'ar';
      app.querySelector('h1').textContent = 'برنامج العضلات والنظام الغذائي';
      app.querySelectorAll('h2')[0].textContent = 'حاسبة السعرات الحرارية';
      app.querySelectorAll('h2')[1].textContent = 'تتبع الوزن';
      app.querySelectorAll('h2')[2].textContent = 'برنامج العضلات والنظام الغذائي';
      document.querySelectorAll('input[name="age"]').forEach(el => el.placeholder = 'العمر');
      document.querySelectorAll('input[name="weight"]').forEach(el => el.placeholder = 'الوزن (كجم)');
      document.querySelectorAll('input[name="height"]').forEach(el => el.placeholder = 'الطول (سم)');
      document.querySelectorAll('input[name="initialWeight"]').forEach(el => el.placeholder = 'الوزن الابتدائي (كجم)');
      document.querySelectorAll('input[name="goalWeight"]').forEach(el => el.placeholder = 'هدف الوزن (كجم)');
      document.querySelectorAll('option[value="male"]').forEach(el => el.textContent = 'رجل');
      document.querySelectorAll('option[value="female"]').forEach(el => el.textContent = 'امرأة');
      document.querySelectorAll('option[value="1.2"]').forEach(el => el.textContent = 'كسول');
      document.querySelectorAll('option[value="1.375"]').forEach(el => el.textContent = 'نشط بعض الشيء');
      document.querySelectorAll('option[value="1.55"]').forEach(el => el.textContent = 'نشط بشكل معتدل');
      document.querySelectorAll('option[value="1.725"]').forEach(el => el.textContent = 'نشط جدا');
      document.querySelectorAll('option[value="1.9"]').forEach(el => el.textContent = 'نشط للغاية');
      document.querySelectorAll('button[type="submit"]')[0].textContent = 'احسب';
      document.querySelectorAll('button[type="submit"]')[1].textContent = 'احسب الهدف';
    } else {
      document.documentElement.lang = 'fr';
      app.querySelector('h1').textContent = 'Programme de Musculation et Régime';
      app.querySelectorAll('h2')[0].textContent = 'Calculateur de Calories';
      app.querySelectorAll('h2')[1].textContent = 'Suivi de Poids';
      app.querySelectorAll('h2')[2].textContent = 'Programme de Musculation et Régime';
      document.querySelectorAll('input[name="age"]').forEach(el => el.placeholder = 'Âge');
      document.querySelectorAll('input[name="weight"]').forEach(el => el.placeholder = 'Poids (kg)');
      document.querySelectorAll('input[name="height"]').forEach(el => el.placeholder = 'Taille (cm)');
      document.querySelectorAll('input[name="initialWeight"]').forEach(el => el.placeholder = 'Poids initial (kg)');
      document.querySelectorAll('input[name="goalWeight"]').forEach(el => el.placeholder = 'Objectif de poids (kg)');
      document.querySelectorAll('option[value="male"]').forEach(el => el.textContent = 'Homme');
      document.querySelectorAll('option[value="female"]').forEach(el => el.textContent = 'Femme');
      document.querySelectorAll('option[value="1.2"]').forEach(el => el.textContent = 'Sédentaire');
      document.querySelectorAll('option[value="1.375"]').forEach(el => el.textContent = 'Légèrement actif');
      document.querySelectorAll('option[value="1.55"]').forEach(el => el.textContent = 'Modérément actif');
      document.querySelectorAll('option[value="1.725"]').forEach(el => el.textContent = 'Très actif');
      document.querySelectorAll('option[value="1.9"]').forEach(el => el.textContent = 'Super actif');
      document.querySelectorAll('button[type="submit"]')[0].textContent = 'Calculer';
      document.querySelectorAll('button[type="submit"]')[1].textContent = 'Calculer Objectif';
    }
  });

  // Calorie Calculator
  const calorieForm = document.getElementById('calorie-form');
  const calorieResult = document.getElementById('calorie-result');
  calorieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(calorieForm);
    const age = formData.get('age');
    const sex = formData.get('sex');
    const weight = formData.get('weight');
    const height = formData.get('height');
    const activityLevel = formData.get('activityLevel');
    const calories = calculateCalories(age, sex, weight, height, activityLevel);
    calorieResult.textContent = `Calories quotidiennes : ${calories}`;
  });

  function calculateCalories(age, sex, weight, height, activityLevel) {
    let bmr;
    if (sex === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    return bmr * activityLevel;
  }

  // Weight Progress Tracking
  const weightForm = document.getElementById('weight-form');
  const weightResult = document.getElementById('weight-result');
  weightForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(weightForm);
    const initialWeight = formData.get('initialWeight');
    const goalWeight = formData.get('goalWeight');
    const weeklyChange = (initialWeight - goalWeight) / 12; // Par exemple, sur 12 semaines
    weightResult.innerHTML = `Poids initial: ${initialWeight} kg<br>Objectif de poids: ${goalWeight} kg<br>Changement hebdomadaire recommandé: ${weeklyChange.toFixed(2)} kg`;
  });

    // Program List
  const programList = document.getElementById('program-list');
  const programDetails = {
    'Lundi': [
      'Petit déjeuner : Flocons d\'avoine avec des fruits et du miel',
      'Déjeuner : Salade de poulet grillé avec légumes variés et quinoa',
      'Dîner : Poisson grillé avec légumes cuits à la vapeur et riz brun',
      'Exercices :',
      'Pompes : 4 séries de 12 répétitions',
      'Développé couché : 3 séries de 10 répétitions',
      'Dips triceps : 3 séries de 10 répétitions',
      'Extensions triceps à la corde : 3 séries de 12 répétitions'
    ],
    'Mardi': [
      'Petit déjeuner : Smoothie vert (banane, épinards, lait d\'amande, graines de chia)',
      'Déjeuner : Sandwich au thon avec légumes et pain complet',
      'Dîner : Poulet rôti avec patates douces et haricots verts',
      'Exercices :',
      'Tractions : 4 séries de 8 répétitions',
      'Rowing barre : 3 séries de 10 répétitions',
      'Curl biceps avec haltères : 3 séries de 12 répétitions',
      'Curl marteau : 3 séries de 12 répétitions'
    ],
    'Mercredi': [
      'Petit déjeuner : Yaourt grec avec fruits rouges et noix',
      'Déjeuner : Salade de lentilles avec légumes et vinaigrette',
      'Dîner : Sauté de tofu avec légumes et nouilles de riz',
      'Exercices :',
      'Squats : 4 séries de 12 répétitions',
      'Fentes avant : 3 séries de 10 répétitions par jambe',
      'Leg press : 3 séries de 12 répétitions',
      'Crunchs abdominaux : 4 séries de 15 répétitions'
    ],
    'Jeudi': [
      'Petit déjeuner : Œufs brouillés avec épinards et toast complet',
      'Déjeuner : Soupe de légumes avec une tranche de pain complet',
      'Dîner : Steak maigre avec brocoli rôti et pommes de terre',
      'Exercices :',
      'Développé militaire : 4 séries de 10 répétitions',
      'Élévations latérales : 3 séries de 12 répétitions',
      'Extensions triceps à la corde : 3 séries de 12 répétitions',
      'Dips triceps : 3 séries de 10 répétitions'
    ],
    'Vendredi': [
      'Petit déjeuner : Smoothie protéiné (banane, poudre de protéine, lait d\'amande)',
      'Déjeuner : Wrap au poulet avec légumes et sauce au yaourt',
      'Dîner : Saumon au four avec quinoa et asperges',
      'Exercices :',
      'Rowing barre : 4 séries de 10 répétitions',
      'Tractions : 3 séries de 8 répétitions',
      'Curl biceps avec haltères : 3 séries de 12 répétitions',
      'Curl concentration : 3 séries de 12 répétitions'
    ],
    'Samedi': [
      'Petit déjeuner : Pain complet avec avocat et œufs pochés',
      'Déjeuner : Salade niçoise avec thon et légumes variés',
      'Dîner : Boulettes de dinde avec courgettes et riz basmati',
      'Exercices :',
      'Squats : 4 séries de 12 répétitions',
      'Leg press : 3 séries de 12 répétitions',
      'Fentes arrières : 3 séries de 10 répétitions par jambe',
      'Planche abdominale : 3 séries de 1 minute'
    ],
    'Dimanche': [
      'Petit déjeuner : Pancakes à la banane avec sirop d\'érable',
      'Déjeuner : Quiche aux légumes avec une salade verte',
      'Dîner : Poulet au curry avec riz et légumes',
      'Exercices :',
      'Repos ou Cardio léger : Marche rapide 30 minutes',
      'Étirements : 15 minutes'
    ]
  };

  for (let day in programDetails) {
    const dayItem = document.createElement('li');
    dayItem.className = 'program-day';
    const dayHeader = document.createElement('h3');
    dayHeader.textContent = day;
    dayItem.appendChild(dayHeader);

    programDetails[day].forEach(detail => {
      const detailItem = document.createElement('div');
      detailItem.className = 'exercise';
      detailItem.textContent = detail;
      dayItem.appendChild(detailItem);
    });

    programList.appendChild(dayItem);
  }
});
