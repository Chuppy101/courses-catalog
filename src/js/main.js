(() => {
  const VISIBLE_STEP = 9;
  const PLACEHOLDER_IMAGE = 'assets/teachers/teacher-10.png';

  const categories = [
    { id: 'all', title: 'All' },
    { id: 'marketing', title: 'Marketing' },
    { id: 'management', title: 'Management' },
    { id: 'hr', title: 'HR & Recruiting' },
    { id: 'design', title: 'Design' },
    { id: 'development', title: 'Development' },
  ];

  const courses = [
    {
      title: 'The Ultimate Google Ads Training Course',
      author: 'Jerome Bell',
      price: '$100',
      category: 'marketing',
      image: 'assets/teachers/teacher-1.png',
    },
    {
      title: 'Product Management Fundamentals',
      author: 'Marvin McKinney',
      price: '$480',
      category: 'management',
      image: 'assets/teachers/teacher-2.png',
    },
    {
      title: 'HR Management and Analytics',
      author: 'Leslie Alexander Li',
      price: '$200',
      category: 'hr',
      image: 'assets/teachers/teacher-3.png',
    },
    {
      title: 'Brand Management & PR Communications',
      author: 'Kristin Watson',
      price: '$530',
      category: 'marketing',
      image: 'assets/teachers/teacher-4.png',
    },
    {
      title: 'Graphic Design Basic',
      author: 'Guy Hawkins',
      price: '$500',
      category: 'design',
      image: 'assets/teachers/teacher-5.png',
    },
    {
      title: 'Business Development Management',
      author: 'Dianne Russell',
      price: '$400',
      category: 'management',
      image: 'assets/teachers/teacher-6.png',
    },
    {
      title: 'Highload Software Architecture',
      author: 'Brooklyn Simmons',
      price: '$600',
      category: 'development',
      image: 'assets/teachers/teacher-7.png',
    },
    {
      title: 'Human Resources - Selection and Recruitment',
      author: 'Kathryn Murphy',
      price: '$150',
      category: 'hr',
      image: 'assets/teachers/teacher-8.png',
    },
    {
      title: 'User Experience. Human-centered Design',
      author: 'Cody Fisher',
      price: '$240',
      category: 'design',
      image: 'assets/teachers/teacher-9.png',
    },
    {
      title: 'Social Media Marketing Strategy',
      author: 'Eleanor Pena',
      price: '$320',
      category: 'marketing',
      image: 'assets/teachers/teacher-10.png',
    },
    {
      title: 'Content Marketing and Copywriting',
      author: 'Robert Fox',
      price: '$260',
      category: 'marketing',
      image: 'assets/teachers/teacher-11.png',
    },
    {
      title: 'Agile Project Management',
      author: 'Cameron Williamson',
      price: '$430',
      category: 'management',
      image: 'assets/teachers/teacher-12.png',
    },
    {
      title: 'Talent Acquisition Essentials',
      author: 'Savannah Nguyen',
      price: '$180',
      category: 'hr',
      image: 'assets/teachers/teacher-13.png',
    },
    {
      title: 'HR Compliance and People Operations',
      author: 'Jacob Jones',
      price: '$210',
      category: 'hr',
      image: 'assets/teachers/teacher-14.png',
    },
    {
      title: 'Recruiting Funnel Analytics',
      author: 'Theresa Webb',
      price: '$230',
      category: 'hr',
      image: 'assets/teachers/teacher-15.png',
    },
    {
      title: 'Frontend Development with JavaScript',
      author: 'Wade Warren',
      price: '$550',
      category: 'development',
      image: 'assets/teachers/teacher-16.png',
    },
    {
      title: 'Backend API Development Basics',
      author: 'Jenny Wilson',
      price: '$570',
      category: 'development',
      image: 'assets/teachers/teacher-17.png',
    },
  ];

  const state = {
    activeCategory: 'all',
    searchValue: '',
    visibleCount: VISIBLE_STEP,
  };

  const filtersNode = document.querySelector('#categoryFilters');
  const gridNode = document.querySelector('#coursesGrid');
  const searchNode = document.querySelector('#courseSearch');
  const loadMoreNode = document.querySelector('#loadMore');
  const emptyNode = document.querySelector('#emptyMessage');

  const normalizeText = (value) => value.trim().toLowerCase();

  const escapeHtml = (value) =>
    value.replace(/[&<>'"]/g, (char) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#039;',
        '"': '&quot;',
      };

      return entities[char];
    });

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.title : categoryId;
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') {
      return courses.length;
    }

    return courses.filter((course) => course.category === categoryId).length;
  };

  const getFilteredCourses = () => {
    const searchValue = normalizeText(state.searchValue);

    return courses.filter((course) => {
      const categoryMatches = state.activeCategory === 'all' || course.category === state.activeCategory;
      const searchMatches = normalizeText(course.title).includes(searchValue);

      return categoryMatches && searchMatches;
    });
  };

  const createFilterButton = (category) => {
    const isActive = category.id === state.activeCategory;
    const button = document.createElement('button');

    button.className = `courses__filter${isActive ? ' courses__filter--active' : ''}`;
    button.type = 'button';
    button.dataset.category = category.id;
    button.setAttribute('aria-pressed', String(isActive));
    button.innerHTML = `${escapeHtml(category.title)} <sup>${getCategoryCount(category.id)}</sup>`;

    return button;
  };

  const renderFilters = () => {
    const fragment = document.createDocumentFragment();

    categories.forEach((category) => {
      fragment.append(createFilterButton(category));
    });

    filtersNode.innerHTML = '';
    filtersNode.append(fragment);
  };

  const createCourseCard = (course) => {
    const categoryTitle = getCategoryTitle(course.category);

    return `
      <article class="course-card">
        <div class="course-card__media">
          <img
            class="course-card__image"
            src="${escapeHtml(course.image)}"
            alt="${escapeHtml(course.author)}"
            loading="lazy"
            onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'"
          />
        </div>
        <div class="course-card__content">
          <span class="course-card__tag course-card__tag--${escapeHtml(course.category)}">${escapeHtml(categoryTitle)}</span>
          <h2 class="course-card__title">${escapeHtml(course.title)}</h2>
          <p class="course-card__meta">
            <span class="course-card__price">${escapeHtml(course.price)}</span>
            <span class="course-card__divider">|</span>
            <span>by ${escapeHtml(course.author)}</span>
          </p>
        </div>
      </article>
    `;
  };

  const renderCourses = () => {
    const filteredCourses = getFilteredCourses();
    const visibleCourses = filteredCourses.slice(0, state.visibleCount);

    gridNode.innerHTML = visibleCourses.map(createCourseCard).join('');
    emptyNode.hidden = filteredCourses.length > 0;
    loadMoreNode.hidden = visibleCourses.length >= filteredCourses.length;
  };

  const render = () => {
    renderFilters();
    renderCourses();
  };

  filtersNode.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');

    if (!button) {
      return;
    }

    state.activeCategory = button.dataset.category;
    state.visibleCount = VISIBLE_STEP;
    render();
  });

  searchNode.addEventListener('input', (event) => {
    state.searchValue = event.target.value;
    state.visibleCount = VISIBLE_STEP;
    renderCourses();
  });

  loadMoreNode.addEventListener('click', () => {
    state.visibleCount += VISIBLE_STEP;
    renderCourses();
  });

  render();
})();
