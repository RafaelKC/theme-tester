        const defaultPresets = {
            'Sunset': {
                colorPrimary: '#ff6b35',
                colorSecondary: '#f77f00',
                bg1: '#fff5f0',
                bg2: '#ffffff',
                bgHighlight: '#ffe5d9',
                textColor: '#1a0a00',
                titleColor: '#1a0a00',
                borderColor: '#ffd4ba'
            },
            'Ocean': {
                colorPrimary: '#0077be',
                colorSecondary: '#4a90e2',
                bg1: '#f0f8ff',
                bg2: '#ffffff',
                bgHighlight: '#e0f2ff',
                textColor: '#001a33',
                titleColor: '#002a4a',
                borderColor: '#b3d9ff'
            },
            'Forest': {
                colorPrimary: '#2d8659',
                colorSecondary: '#52b788',
                bg1: '#f0f5f0',
                bg2: '#ffffff',
                bgHighlight: '#e8f3ea',
                textColor: '#0d1f0d',
                titleColor: '#1a3d1a',
                borderColor: '#c1e0cc'
            },
            'Neon': {
                colorPrimary: '#00ff88',
                colorSecondary: '#00d9ff',
                bg1: '#0a0a0f',
                bg2: '#15151a',
                bgHighlight: '#1f1f2a',
                textColor: '#f0f0ff',
                titleColor: '#ffffff',
                borderColor: '#2a2a3a'
            },
            'Candy': {
                colorPrimary: '#ff1493',
                colorSecondary: '#ff69b4',
                bg1: '#fff0f8',
                bg2: '#ffffff',
                bgHighlight: '#ffe0f0',
                textColor: '#330022',
                titleColor: '#4d0033',
                borderColor: '#ffb3e6'
            },
            'Mono': {
                colorPrimary: '#333333',
                colorSecondary: '#666666',
                bg1: '#fafafa',
                bg2: '#ffffff',
                bgHighlight: '#f0f0f0',
                textColor: '#0a0a0a',
                titleColor: '#1a1a1a',
                borderColor: '#e0e0e0'
            }
        };

        const controls = {
            colorPrimary: document.getElementById('colorPrimary'),
            colorSecondary: document.getElementById('colorSecondary'),
            bg1: document.getElementById('bg1'),
            bg2: document.getElementById('bg2'),
            bgHighlight: document.getElementById('bgHighlight'),
            textColor: document.getElementById('textColor'),
            titleColor: document.getElementById('titleColor'),
            borderColor: document.getElementById('borderColor'),
            fontNormal: document.getElementById('fontNormal'),
            fontTitle: document.getElementById('fontTitle'),
            fontSize: document.getElementById('fontSize'),
            borderRadius: document.getElementById('borderRadius'),
            borderSize: document.getElementById('borderSize'),
            shadowIntensity: document.getElementById('shadowIntensity')
        };

        let currentTheme = null;

        function updateStyle(input, cssVar, valueDisplay) {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                document.documentElement.style.setProperty(cssVar, value);
                if (valueDisplay) {
                    valueDisplay.textContent = value;
                }
                updateCssOutput();
            });
        }

        updateStyle(controls.colorPrimary, '--color-primary', document.getElementById('colorPrimaryValue'));
        updateStyle(controls.colorSecondary, '--color-secondary', document.getElementById('colorSecondaryValue'));
        updateStyle(controls.bg1, '--bg-1', document.getElementById('bg1Value'));
        updateStyle(controls.bg2, '--bg-2', document.getElementById('bg2Value'));
        updateStyle(controls.bgHighlight, '--bg-highlight', document.getElementById('bgHighlightValue'));
        updateStyle(controls.textColor, '--text-color', document.getElementById('textColorValue'));
        updateStyle(controls.titleColor, '--title-color', document.getElementById('titleColorValue'));
        updateStyle(controls.borderColor, '--border-color', document.getElementById('borderColorValue'));

        controls.fontNormal.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--font-normal', e.target.value);
            updateCssOutput();
        });

        controls.fontTitle.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--font-title', e.target.value);
            updateCssOutput();
        });

        controls.fontSize.addEventListener('input', (e) => {
            const value = e.target.value + 'px';
            document.documentElement.style.setProperty('--font-size', value);
            document.getElementById('fontSizeValue').textContent = value;
            updateCssOutput();
        });

        controls.borderRadius.addEventListener('input', (e) => {
            const value = e.target.value + 'px';
            document.documentElement.style.setProperty('--border-radius', value);
            document.getElementById('borderRadiusValue').textContent = value;
            updateCssOutput();
        });

        controls.borderSize.addEventListener('input', (e) => {
            const value = e.target.value + 'px';
            document.documentElement.style.setProperty('--border-size', value);
            document.getElementById('borderSizeValue').textContent = value;
            updateCssOutput();
        });

        controls.shadowIntensity.addEventListener('input', (e) => {
            const value = `0 10px ${e.target.value}px rgba(0, 0, 0, 0.08)`;
            document.documentElement.style.setProperty('--box-shadow', value);
            document.getElementById('shadowIntensityValue').textContent = e.target.value + 'px';
            updateCssOutput();
        });

        function getCurrentTheme() {
            return {
                colorPrimary: controls.colorPrimary.value,
                colorSecondary: controls.colorSecondary.value,
                bg1: controls.bg1.value,
                bg2: controls.bg2.value,
                bgHighlight: controls.bgHighlight.value,
                textColor: controls.textColor.value,
                titleColor: controls.titleColor.value,
                borderColor: controls.borderColor.value,
                fontNormal: controls.fontNormal.value,
                fontTitle: controls.fontTitle.value,
                fontSize: controls.fontSize.value,
                borderRadius: controls.borderRadius.value,
                borderSize: controls.borderSize.value,
                shadowIntensity: controls.shadowIntensity.value
            };
        }

        function loadTheme(themeName) {
            const allThemes = { ...defaultPresets, ...JSON.parse(localStorage.getItem('customThemes') || '{}') };
            const theme = allThemes[themeName];
            
            if (theme) {
                currentTheme = themeName;
                Object.keys(theme).forEach(key => {
                    if (controls[key]) {
                        controls[key].value = theme[key];
                        const event = new Event('input', { bubbles: true });
                        controls[key].dispatchEvent(event);
                    }
                });
                renderThemes();
            }
        }

        function saveTheme() {
            const themeName = prompt('Enter a name for this theme:');
            if (themeName) {
                const theme = getCurrentTheme();
                const customThemes = JSON.parse(localStorage.getItem('customThemes') || '{}');
                customThemes[themeName] = theme;
                localStorage.setItem('customThemes', JSON.stringify(customThemes));
                currentTheme = themeName;
                renderThemes();
                alert('Theme saved successfully!');
            }
        }

        function deleteTheme(themeName) {
            if (confirm(`Delete theme "${themeName}"?`)) {
                const customThemes = JSON.parse(localStorage.getItem('customThemes') || '{}');
                delete customThemes[themeName];
                localStorage.setItem('customThemes', JSON.stringify(customThemes));
                renderThemes();
            }
        }

        function resetTheme() {
            loadTheme('Sunset');
        }

        function renderThemes() {
            const grid = document.getElementById('themeGrid');
            grid.innerHTML = '';
            
            const customThemes = JSON.parse(localStorage.getItem('customThemes') || '{}');
            const allThemes = { ...defaultPresets, ...customThemes };
            
            Object.keys(allThemes).forEach(name => {
                const theme = allThemes[name];
                const isCustom = !defaultPresets[name];
                const card = document.createElement('div');
                card.className = 'theme-card' + (currentTheme === name ? ' active' : '');
                
                card.innerHTML = `
                    <div class="theme-preview" style="background: ${theme.bg1};">
                        <div class="theme-preview-bars">
                            <div class="preview-bar" style="background: ${theme.bg2 || theme.bg1}; border: ${theme.borderColor || '#e0e0e0'}; width: 70%;">
                                <div class="preview-bar-accent" style="background: ${theme.colorPrimary}; width: 60%;"></div>
                            </div>
                            <div class="preview-bar" style="background: ${theme.bgHighlight || theme.bg1}; border: ${theme.borderColor || '#e0e0e0'}; width: 90%;">
                                <div class="preview-bar-accent" style="background: ${theme.colorSecondary}; width: 40%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="theme-name">
                        ${name}
                        ${isCustom ? `<span class="theme-delete" onclick="event.stopPropagation(); deleteTheme('${name}')">×</span>` : ''}
                    </div>
                `;
                
                card.onclick = () => loadTheme(name);
                grid.appendChild(card);
            });
        }

        function updateCssOutput() {
            const theme = getCurrentTheme();
            const css = `:root {
    --color-primary: ${theme.colorPrimary};
    --color-secondary: ${theme.colorSecondary};
    --bg-1: ${theme.bg1};
    --bg-2: ${theme.bg2};
    --bg-highlight: ${theme.bgHighlight};
    --text-color: ${theme.textColor};
    --title-color: ${theme.titleColor};
    --border-color: ${theme.borderColor};
    --font-normal: ${theme.fontNormal};
    --font-title: ${theme.fontTitle};
    --font-size: ${theme.fontSize}px;
    --border-radius: ${theme.borderRadius}px;
    --border-size: ${theme.borderSize}px;
    --box-shadow: 0 10px ${theme.shadowIntensity}px rgba(0, 0, 0, 0.08);
}`;
            document.getElementById('cssOutput').value = css;
        }

        function copyCss() {
            const textarea = document.getElementById('cssOutput');
            textarea.select();
            document.execCommand('copy');
            alert('CSS copied to clipboard!');
        }

        renderThemes();
        updateCssOutput();