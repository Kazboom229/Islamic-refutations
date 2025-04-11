import streamlit as st
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from utils import create_equation, display_slide_header
from physics_models import (
    virtual_particle_visualization, 
    spacetime_expansion_visualization,
    quantum_fluctuation_visualization,
    dark_energy_visualization,
    black_hole_thermodynamics_visualization
)
from philosophical_arguments import (
    display_philosophical_argument_slide,
    display_logical_fallacies_slide,
    display_metaphysical_arguments_slide,
    display_formal_logic_slide
)
from references import display_references
from translations import get_translation

# Configure page
st.set_page_config(
    page_title="Challenging Energy Conservation Absolutism",
    page_icon="⚛️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state for language
if 'language' not in st.session_state:
    st.session_state.language = "en"

# Function to translate text
def t(key):
    """Translate a key using the current language."""
    return get_translation(key, st.session_state.language)

# Sidebar navigation with language selector
st.sidebar.title("Navigation")

# Language selector
selected_language = st.sidebar.selectbox(
    t("language_selector"),
    options=["English", "Somali"],
    index=0 if st.session_state.language == "en" else 1
)

# Update language based on selection
if selected_language == "English" and st.session_state.language != "en":
    st.session_state.language = "en"
    st.rerun()
elif selected_language == "Somali" and st.session_state.language != "so":
    st.session_state.language = "so"
    st.rerun()

# Navigation
section = st.sidebar.radio(
    t("select_section"),
    [t("introduction"), 
     t("historical_context"), 
     t("definitions"), 
     t("scientific_evidence"),
     t("quantum_mechanics"), 
     t("cosmological"),
     t("philosophical"), 
     t("logical_fallacies"),
     t("formal_logic"),
     t("metaphysical"), 
     t("conclusion"),
     t("references")]
)

# Title slide
if section == t("introduction"):
    st.title(t("intro_title"))
    st.subheader(t("intro_subtitle"))
    
    st.markdown("""
    ## Abstract
    
    This presentation examines the limitations and contextual applicability of energy conservation principles in physics. 
    While conservation laws have been foundational to modern physics, emerging evidence from quantum mechanics, cosmology, 
    and theoretical physics suggests scenarios where strict energy conservation may not hold absolutely.
    
    We will explore:
    
    1. The historical development and limits of energy conservation laws
    2. Scientific evidence challenging absolute conservation
    3. Philosophical implications of limited conservation principles
    4. Alternative frameworks for understanding energy in modern physics
    
    This analysis does not aim to invalidate conservation principles but to place them in their proper scientific context
    and explore their boundaries in extreme conditions and theoretical frameworks.
    """)
    
    # Introductory visualization - energy transformation
    st.subheader("Energy Transformations vs. Creation/Destruction")
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Left side: Conservation (transformation)
    ax.plot([0, 1, 2, 3, 4], [5, 4, 3, 2, 1], 'b-', linewidth=2, label='Potential Energy')
    ax.plot([0, 1, 2, 3, 4], [1, 2, 3, 4, 5], 'r-', linewidth=2, label='Kinetic Energy')
    ax.plot([0, 1, 2, 3, 4], [6, 6, 6, 6, 6], 'k--', linewidth=2, label='Total Energy')
    
    # Right side: Non-conservation (with gap)
    ax.plot([6, 7, 8, 9, 10], [5, 4, 3, 2, 1], 'b-', linewidth=2)
    ax.plot([6, 7, 8, 9, 10], [1, 2, 3, 4, 5], 'r-', linewidth=2)
    ax.plot([6, 7, 8, 9, 10], [6, 7, 8, 7, 6], 'k--', linewidth=2)
    
    # Add annotation showing the difference
    ax.annotate('', xy=(5, 3), xytext=(5, 8), arrowprops=dict(arrowstyle='<->'))
    ax.text(5.2, 5.5, 'Energy Creation\n& Destruction\nin certain contexts', fontsize=10)
    
    ax.set_xlim(-0.5, 10.5)
    ax.set_ylim(0, 9)
    ax.legend(loc='upper center')
    ax.set_title('Energy Behavior: Classical vs. Quantum/Cosmological Contexts')
    ax.set_xlabel('Time')
    ax.set_ylabel('Energy')
    ax.axvline(x=5, color='gray', linestyle='-', alpha=0.3)
    ax.text(2, 8.5, 'Classical Domain\n(Conservation applies)', ha='center')
    ax.text(8, 8.5, 'Quantum/Cosmological Domain\n(Conservation may not apply)', ha='center')
    
    st.pyplot(fig)

# Historical context slide
elif section == t("historical_context"):
    display_slide_header(t("historical_title"), 
                        t("historical_subtitle"))
    
    st.markdown("""
    ### Evolution of Energy Conservation Concepts
    
    The concept of energy conservation has evolved significantly throughout scientific history:
    
    - **Ancient Philosophy (4th-5th century BCE)**
        - Empedocles and Parmenides: "Nothing comes from nothing"
        - Precursors to conservation principles in natural philosophy
    
    - **17th-18th Centuries**
        - Gottfried Leibniz (1686): Concept of "vis viva" (living force)
        - Conservation of mechanical energy in idealized systems
    
    - **19th Century Formalization**
        - Julius Robert Mayer (1842): First comprehensive statement of energy conservation
        - James Joule (1843): Experimental work establishing mechanical equivalent of heat
        - Hermann von Helmholtz (1847): Mathematical formulation of energy conservation
    
    - **20th Century Developments**
        - Einstein's mass-energy equivalence (E=mc²)
        - Noether's theorem (1915): Connection between symmetries and conservation laws
        - Quantum mechanics: Introduction of uncertainty and fluctuations
    
    - **Contemporary Context**
        - Quantum field theory allows temporary violations via energy-time uncertainty
        - General relativity: Energy conservation complications in expanding space
        - Dark energy: Challenges to energy accounting in cosmic expansion
    """)
    
    # Create a timeline visualization
    timeline_data = pd.DataFrame({
        'Time': ['Ancient', '1686', '1840s', '1905', '1915', '1927', 'Modern'],
        'Event': ['Philosophical origins', 'Leibniz: vis viva', 'Formal law established', 'E=mc²', 'Noether\'s theorem', 'Quantum mechanics', 'QFT & cosmology'],
        'Absolutism': [0.9, 0.95, 1.0, 0.9, 0.85, 0.6, 0.4]
    })
    
    fig = px.line(timeline_data, x='Time', y='Absolutism', 
                 labels={'Time': 'Historical Period', 'Absolutism': 'Perceived Absolutism of Energy Conservation'},
                 title='Historical Trend: Absolutism of Energy Conservation')
    
    fig.update_layout(
        annotations=[
            dict(x=row['Time'], y=row['Absolutism'],
                 text=row['Event'],
                 showarrow=True,
                 arrowhead=1,
                 ax=0,
                 ay=-40 if i % 2 == 0 else -80)
            for i, row in timeline_data.iterrows()
        ]
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("""
    ### Key Historical Insight
    
    Energy conservation was not discovered as an absolute truth but *developed* as a useful principle 
    that worked within specific experimental contexts. Its universality was an assumption that went
    beyond the evidence, driven by the success of conservation principles in classical mechanics.
    
    As physics expanded beyond classical domains, the limitations of absolute conservation became apparent.
    """)

# Definitions slide
elif section == t("definitions"):
    display_slide_header(t("definitions_title"), 
                        t("definitions_subtitle"))
    
    st.markdown("""
    ### Precise Formulation of Energy Conservation
    
    Energy conservation is often stated colloquially as "energy cannot be created or destroyed," 
    but this is an oversimplification of the actual scientific principle.
    
    #### Technical Formulation in Classical Physics:
    """)
    
    create_equation(r"E_{total} = E_{kinetic} + E_{potential} + E_{thermal} + ... = constant")
    
    st.markdown("""
    #### Noether's Theorem Formulation:
    Energy conservation arises from time-translation symmetry in closed systems:
    """)
    
    create_equation(r"\frac{d}{dt}\int T^{00}d^3x = 0")
    
    st.markdown("""
    where $T^{00}$ is the energy density component of the stress-energy tensor.
    
    ### Key Qualifications and Scope
    
    The law of energy conservation is **not** an absolute metaphysical principle but a physical law with specific conditions:
    
    1. **Closed systems only**: Only applicable to isolated systems with no external interactions
    2. **Time-translation invariance**: Requires that physical laws remain unchanged over time
    3. **Classical domain focus**: Developed primarily for macroscopic, classical phenomena
    4. **Flat spacetime assumption**: Standard formulation assumes non-curved spacetime
    5. **Local conservation**: In field theory, expressed as continuity equations for local conservation
    """)
    
    # Create a Venn diagram showing where energy conservation applies
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Draw circles
    circle1 = plt.Circle((0.3, 0.6), 0.25, color='blue', alpha=0.3, label='Classical Mechanics')
    circle2 = plt.Circle((0.5, 0.4), 0.25, color='red', alpha=0.3, label='Thermodynamics')
    circle3 = plt.Circle((0.7, 0.6), 0.25, color='green', alpha=0.3, label='Electromagnetism')
    
    # Draw regions where conservation is challenged
    quantum = plt.Rectangle((0.1, 0.1), 0.3, 0.2, color='purple', alpha=0.2)
    cosmology = plt.Rectangle((0.6, 0.1), 0.3, 0.2, color='orange', alpha=0.2)
    
    # Add shapes to plot
    ax.add_patch(circle1)
    ax.add_patch(circle2)
    ax.add_patch(circle3)
    ax.add_patch(quantum)
    ax.add_patch(cosmology)
    
    # Add text
    ax.text(0.3, 0.6, 'Classical\nMechanics', ha='center', va='center')
    ax.text(0.5, 0.4, 'Thermodynamics', ha='center', va='center')
    ax.text(0.7, 0.6, 'Electromagnetism', ha='center', va='center')
    ax.text(0.25, 0.2, 'Quantum\nMechanics', ha='center', va='center')
    ax.text(0.75, 0.2, 'Cosmology', ha='center', va='center')
    
    # Add title
    ax.text(0.5, 0.9, 'Domains of Physics and Energy Conservation Applicability', 
            ha='center', va='center', fontsize=14, fontweight='bold')
    
    # Add legend
    ax.text(0.5, 0.05, 'Blue/Red/Green: Conservation applies rigorously\nPurple/Orange: Conservation faces challenges', 
            ha='center', va='center', fontsize=10)
    
    # Remove axis
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    st.pyplot(fig)
    
    st.markdown("""
    ### Important Distinctions
    
    1. **Conservation vs. Transformation**: Energy conservation traditionally refers to transformation between different forms, not the impossibility of creation/destruction
    
    2. **Local vs. Global Conservation**: Energy can be locally non-conserved while globally conserved (or vice versa)
    
    3. **Ontological vs. Epistemological**: Energy conservation can be viewed as an accounting principle rather than a fundamental limitation on nature
    """)

# Scientific Evidence slide
elif section == t("scientific_evidence"):
    display_slide_header(t("scientific_title"), 
                        t("scientific_subtitle"))
    
    st.markdown("""
    ### Quantum Mechanics: Temporary Violations
    
    Quantum mechanics permits temporary violations of energy conservation through the energy-time uncertainty principle:
    """)
    
    create_equation(r"\Delta E \cdot \Delta t \geq \frac{\hbar}{2}")
    
    st.markdown("""
    This allows for "energy loans" where particles can temporarily borrow energy from the quantum vacuum.
    
    #### Virtual Particles
    Virtual particles continually appear and disappear in the quantum vacuum, representing temporary violations of energy conservation:
    """)
    
    virtual_particle_visualization()
    
    st.markdown("""
    ### The Mathematical Foundation: Noether's Theorem and Time Invariance
    
    The deep mathematical connection between symmetry and conservation laws was formalized by Emmy Noether in her groundbreaking 1918 theorem:
    
    1. **Formal statement**: For every continuous symmetry of the laws of physics, there exists a corresponding conservation law
    2. **Time-translation symmetry**: If physical laws remain unchanged over time, energy is conserved
    3. **Spacetime symmetries**: Each symmetry leads to a specific conservation law:
        - Time translation → Energy conservation 
        - Space translation → Momentum conservation
        - Rotation → Angular momentum conservation
    """)
    
    create_equation(r"\frac{d}{dt}\int \mathcal{L} dt = 0 \quad \Rightarrow \quad \frac{dE}{dt} = 0")
    
    st.markdown("""
    In the Lagrangian formulation of mechanics, if the Lagrangian $\mathcal{L}$ does not explicitly depend on time, then energy is conserved.
    
    #### Mathematical Proof (Simplified):
    
    1. Start with the action integral:
    """)
    
    # Show the action integral equation
    create_equation(r"S = \int_{t_1}^{t_2} \mathcal{L}(q, \dot{q}) dt")
    
    st.markdown("""
    2. If $\mathcal{L}$ doesn't explicitly depend on time, we have a symmetry under time translations
    
    3. Noether's theorem guarantees a conserved quantity:
    """)
    
    # Show Noether's theorem equation
    create_equation(r"E = \sum_i \dot{q}_i \frac{\partial \mathcal{L}}{\partial \dot{q}_i} - \mathcal{L}")
    
    st.markdown("""
    4. This conserved quantity is exactly the Hamiltonian, which we identify as energy
    
    ### General Relativity: Breaking Time Invariance in Expanding Space
    
    In general relativity, energy conservation becomes problematic precisely because time symmetry is broken:
    
    1. **Curved spacetime** breaks global time-translation symmetry:
        - No global time coordinate in arbitrarily curved spacetime
        - Energy not well-defined globally (no timelike Killing vector)
    
    2. **Expanding universe** explicitly breaks time symmetry:
        - The scale factor $a(t)$ introduces time dependence into the metric:
          $ds^2 = -dt^2 + a^2(t)(dx^2 + dy^2 + dz^2)$
        - The Lagrangian now has explicit time dependence through $a(t)$
        - By Noether's theorem: time dependence → energy non-conservation
    
    3. **Covariant conservation** is maintained but doesn't imply energy conservation:
        - Energy-momentum tensor obeys $\\nabla_\\mu T^{\\mu\\nu} = 0$
        - This represents local conservation of 4-momentum, not global energy conservation
        - In an expanding universe, this allows photons to lose energy via redshift
    
    #### Expanding Universe Energy Accounting
    """)
    
    spacetime_expansion_visualization()
    
    st.markdown("""
    ### Recent Experimental Results
    
    Several experimental observations suggest possible limitations to energy conservation:
    
    1. **Casimir Effect**: Measurable force arising from quantum vacuum fluctuations
    2. **Lamb Shift**: Energy level shifts in hydrogen from interaction with virtual particles
    3. **Cosmological redshift**: Photons lose energy in expanding space without clear transfer
    
    These phenomena don't definitively prove energy non-conservation but demonstrate contexts where conventional accounting becomes problematic.
    """)
    
    # Create a data table of experimental phenomena
    evidence_data = pd.DataFrame({
        'Phenomenon': ['Casimir Effect', 'Lamb Shift', 'Cosmological Redshift', 'Dark Energy', 'Black Hole Evaporation'],
        'Observation': ['Force between uncharged plates', 'Energy level shifts in atoms', 'Photon energy loss in expansion', 'Accelerating cosmic expansion', 'Thermal radiation from black holes'],
        'Conservation Challenge': ['Energy from "nothing"', 'Energy fluctuations', 'Energy disappearance', 'Increasing energy density', 'Information-energy paradox'],
        'Year Discovered': [1948, 1947, 1929, 1998, 1974]
    })
    
    st.table(evidence_data)

# Quantum Mechanics Challenges slide
elif section == t("quantum_mechanics"):
    display_slide_header(t("quantum_title"), 
                        t("quantum_subtitle"))
    
    st.markdown("""
    ### Quantum Fluctuations and the Vacuum
    
    Quantum field theory describes the vacuum not as empty space but as a sea of quantum fluctuations with:
    
    - Continuous creation and annihilation of virtual particle pairs
    - Non-zero energy density
    - Fluctuating energy values constrained only by the uncertainty principle
    
    #### Vacuum Fluctuations Visualization:
    """)
    
    quantum_fluctuation_visualization()
    
    st.markdown("""
    ### Measurement and Energy Determination
    
    In quantum mechanics, energy becomes a statistical property with important implications:
    
    1. **Energy as expectation value**: $E = \\langle\\psi|\\hat{H}|\\psi\\rangle$
    2. **Energy superpositions**: Quantum systems can exist in superpositions of different energy states
    3. **Measurement collapse**: Energy becomes determinate only upon measurement
    
    This challenges the classical notion of energy as a continuously tracked quantity.
    
    ### Quantum Tunneling
    
    Quantum tunneling allows particles to pass through energy barriers that would be forbidden in classical physics:
    """)
    
    # Create tunneling visualization
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Potential barrier
    x = np.linspace(0, 10, 1000)
    V = np.zeros_like(x)
    V[(x > 3) & (x < 7)] = 10
    
    # Classical particle (can't pass barrier)
    classical_x = np.linspace(0, 3, 100)
    classical_y = np.sin(classical_x*5)*0.5 + 2
    
    # Quantum wavefunction (tunnels through)
    psi = np.zeros_like(x)
    psi[x <= 3] = np.sin(x[x <= 3]*5)*0.5 + 2
    psi[(x > 3) & (x < 7)] = np.sin(x[(x > 3) & (x < 7)]*5)*0.1*np.exp(-(x[(x > 3) & (x < 7)]-3)) + 2
    psi[x >= 7] = np.sin(x[x >= 7]*5)*0.1 + 2
    
    # Plot
    ax.plot(x, V, 'k-', linewidth=2, label='Energy Barrier')
    ax.plot(classical_x, classical_y, 'ro-', markersize=0, linewidth=2, label='Classical Particle Path (stopped)')
    ax.plot(x, psi, 'bo-', markersize=0, linewidth=2, label='Quantum Wavefunction (tunnels)')
    
    # Fill the energy region
    ax.fill_between(x, 0, V, color='gray', alpha=0.3)
    
    # Add annotations
    ax.annotate('Classically\nForbidden\nRegion', xy=(5, 5), xytext=(5, 5),
                ha='center', va='center', fontsize=12)
    
    ax.annotate('', xy=(7.5, 2), xytext=(2.5, 2),
                arrowprops=dict(arrowstyle='<->', color='blue', lw=1.5))
    ax.text(5, 1.5, 'Quantum tunneling', ha='center', color='blue')
    
    # Set labels and title
    ax.set_xlabel('Position')
    ax.set_ylabel('Energy/Potential')
    ax.set_title('Quantum Tunneling Through Energy Barrier')
    ax.legend(loc='upper right')
    ax.set_ylim(0, 12)
    
    st.pyplot(fig)
    
    st.markdown("""
    In tunneling, particles effectively access regions that would require more energy than they possess classically.
    While total energy is conserved in the complete quantum description, from a classical perspective, this appears as a
    temporary violation of conservation.
    
    ### Theory of Measurements
    
    The Copenhagen interpretation introduces an apparent energy non-conservation during wavefunction collapse:
    
    1. Before measurement: System exists in superposition of energy states
    2. After measurement: System "collapses" to specific energy value
    3. Energy expectation value changes discontinuously
    
    This suggests energy conservation applies to expectation values but not necessarily to individual measurement outcomes.
    """)

# Cosmological Considerations slide
elif section == t("cosmological"):
    display_slide_header(t("cosmological_title"), 
                        t("cosmological_subtitle"))
    
    st.markdown("""
    ### Cosmic Expansion and Photon Energy
    
    As the universe expands, photons undergo cosmological redshift:
    
    - Photon wavelength increases: $\\lambda_{observed} = \\lambda_{emitted}(1+z)$
    - Photon energy decreases: $E = \\frac{hc}{\\lambda}$
    - Energy appears to be lost without being transferred to another system
    
    This contradicts the classical notion that energy must always be accounted for.
    
    ### Dark Energy and Cosmic Acceleration
    
    Dark energy presents a profound challenge to energy conservation:
    
    1. It maintains constant energy density despite spatial expansion
    2. Total dark energy increases as space expands
    3. No identified source for this increasing energy
    """)
    
    dark_energy_visualization()
    
    st.markdown("""
    #### Mathematical Description
    
    The cosmological constant $\\Lambda$ in Einstein's field equations introduces energy that scales with volume:
    """)
    
    create_equation(r"E_{dark} \propto \Lambda \cdot V")
    
    st.markdown("""
    As volume V increases with expansion, the total dark energy increases with no identified source.
    
    ### Black Hole Thermodynamics
    
    Black hole evaporation through Hawking radiation presents another cosmological challenge:
    
    1. Black holes emit thermal radiation with real energy
    2. This radiation causes black hole mass to decrease
    3. Information appears to be lost (the "information paradox")
    
    This process converts organized matter/energy into disordered radiation with unclear accounting.
    """)
    
    black_hole_thermodynamics_visualization()
    
    st.markdown("""
    ### Energy in Inflationary Cosmology
    
    Inflation theory proposes exponential expansion of early universe:
    
    - Space expanded faster than light speed
    - Quantum fluctuations stretched to macroscopic scales
    - Potential energy converted to particles in "reheating"
    
    This process is claimed to conserve energy, but only by accounting for negative gravitational potential energy
    in ways that highlight the problematic nature of energy accounting in expanding spacetime.
    
    #### Key Insight
    
    In cosmology, energy conservation becomes a coordinate-dependent statement rather than a fundamental principle.
    Different observers can legitimately disagree about whether energy is conserved.
    """)

# Philosophical Arguments slide
elif section == t("philosophical"):
    display_philosophical_argument_slide()

# Logical Fallacies slide
elif section == t("logical_fallacies"):
    display_logical_fallacies_slide()

# Formal Logic slide
elif section == t("formal_logic"):
    display_formal_logic_slide()

# Metaphysical Analysis slide
elif section == t("metaphysical"):
    display_metaphysical_arguments_slide()

# Conclusion slide
elif section == t("conclusion"):
    display_slide_header(t("conclusion_title"), 
                        t("conclusion_subtitle"))
    
    st.markdown("""
    ### Key Findings
    
    Our examination has revealed that:
    
    1. **Contextual Validity**: Energy conservation remains valid in closed systems with time-translation symmetry
    
    2. **Domain Limitations**: The principle faces challenges in quantum mechanics, general relativity, and cosmology
    
    3. **Philosophical Reframing**: Energy conservation is better understood as a useful accounting principle rather than an absolute metaphysical truth
    
    4. **Historical Development**: The absolutism of energy conservation emerged from historical circumstances rather than conclusive evidence
    
    ### Proposed Reframing
    
    We propose understanding energy conservation as:
    
    - A **conditional principle** valid within specific domains
    - An **emergent property** of certain symmetries rather than a fundamental law
    - A **practical tool** for analysis rather than a metaphysical constraint
    - A **statistical truth** that may allow for local or temporary violations
    """)
    
    # Create framework comparison
    comparison_data = pd.DataFrame({
        'Aspect': ['Ontological Status', 'Scope', 'Violations', 'Explaining Anomalies', 'Scientific Utility'],
        'Traditional View': ['Absolute law', 'Universal', 'Impossible', 'Must be explained away', 'Constrains theories'],
        'Proposed Reframing': ['Contextual principle', 'Domain-specific', 'Possible in certain contexts', 'Expected in extreme conditions', 'Guides but doesn\'t constrain']
    })
    
    st.table(comparison_data)
    
    st.markdown("""
    ### Implications for Physics
    
    This reframing has significant implications:
    
    1. **Theoretical Freedom**: Allows for consideration of theories that might temporarily or locally violate conservation
    
    2. **Anomaly Interpretation**: Provides framework for understanding experimental anomalies without forced conservation accounting
    
    3. **Unification Progress**: Removes an artificial constraint on quantum gravity and unified field theories
    
    4. **Philosophical Clarity**: Distinguishes between useful principles and fundamental laws
    
    ### Final Thoughts
    
    The evidence does not suggest abandoning energy conservation, but rather placing it in its proper context:
    
    > "Energy conservation is not transcended but contextualized - a powerful principle with a specific domain of applicability rather than an eternal, inviolable truth."
    
    By understanding its limitations, we gain a deeper appreciation for both the principle's power and the fascinating phenomena that lie at its boundaries.
    """)

# References slide
elif section == t("references"):
    display_references()
