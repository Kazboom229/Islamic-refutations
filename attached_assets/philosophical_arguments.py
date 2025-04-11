import streamlit as st
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from utils import display_slide_header, create_equation
from translations import get_translation

def t(key):
    """Translate a key using the current language."""
    return get_translation(key, st.session_state.language)

def display_philosophical_argument_slide():
    """Display the philosophical arguments slide."""
    display_slide_header(t("philosophical_title"), 
                        t("philosophical_subtitle"))
    
    st.markdown("""
    ### Conceptual Analysis of Energy
    
    1. **Energy as Accounting**: Energy may be better understood as an accounting principle rather than an ontological entity
        - Energy is epistemologically accessible only through its effects, never directly observable
        - Conceptually equivalent to "bookkeeping" of physical interactions
        - As with all accounting systems, conservation is a methodological presupposition, not a discovered truth
    
    2. **Map vs. Territory Problem**: Physical laws describe rather than prescribe reality
        - Conservation laws are our descriptions of patterns, not causal forces governing nature
        - The success of a map (our model) doesn't entail the territory (reality) must conform to it
        - Historical precedent shows models eventually break down at their boundaries (Newtonian to quantum)
    
    3. **Epistemological Status**: Conservation laws are inductive generalizations, not a priori truths
        - Derived from finite observations in limited domains
        - Subject to the problem of induction (Hume): past patterns don't logically entail future conformity
        - As Wittgenstein argued: the rules of a language game are not necessarily universal truths
    """)
    
    # Create chart illustrating philosophical positions
    fig, ax = plt.subplots(figsize=(10, 7))
    
    positions = ['Realism', 'Instrumentalism', 'Structuralism', 'Constructivism']
    descriptions = [
        'Energy exists as a real\nphysical entity',
        'Energy is a useful\naccounting construct',
        'Energy represents structural\nrelations, not substances',
        'Energy is a human\nconceptual framework'
    ]
    conservation_absolutism = [0.9, 0.3, 0.5, 0.1]  # Higher means more absolute
    
    # Create horizontal bars
    y_pos = np.arange(len(positions))
    ax.barh(y_pos, conservation_absolutism, align='center')
    ax.set_yticks(y_pos)
    ax.set_yticklabels(positions)
    
    # Add descriptions
    for i, desc in enumerate(descriptions):
        ax.text(0.02, i, desc, va='center')
    
    # Add labels and title
    ax.set_xlabel('Degree of Conservation Law Absolutism')
    ax.set_title('Philosophical Positions on Energy Conservation')
    ax.set_xlim(0, 1)
    
    # Invert axis to have realism at the top
    ax.invert_yaxis()
    
    st.pyplot(fig)
    
    st.markdown("""
    ### The Ontological Status of Energy
    
    Four major philosophical positions on the nature of energy:
    
    1. **Energy Realism**: Energy exists as a fundamental substance or property
        - Assumes energy has mind-independent existence as a "thing-in-itself"
        - Problematically reifies a mathematical abstraction into an ontological entity
        - Similar to how we once believed in caloric fluid or luminiferous aether
    
    2. **Energy Structuralism**: Energy represents structural relations between physical systems
        - Energy as relation rather than substance (drawing on Cassirer and Russell)
        - Conservation reflects the stability of mathematical structures in our theories
        - Allows for evolution of the concept as our understanding of structure changes
    
    3. **Energy Instrumentalism**: Energy is merely a calculation tool with no independent existence
        - Energy as a human-invented mathematical construct that yields useful predictions
        - Conservation works as a practical heuristic, not a metaphysical truth
        - As Niels Bohr suggested: physical concepts are tools, not descriptions of reality
    
    4. **Energy Constructivism**: Energy is socially constructed through scientific practice
        - Energy concepts evolve through scientific consensus and problem-solving (Kuhn)
        - Conservation reflects disciplinary commitments, not mind-independent reality
        - The history of energy conservation shows continual redefinition to maintain the principle
    
    Modern physics increasingly favors structuralism or instrumentalism over realism,
    undermining the metaphysical foundations of absolute conservation.
    
    ### Modal Logic Analysis
    
    Energy conservation can be rigorously analyzed through modal logic frameworks:
    
    1. **Logical necessity** (□L): True in all logically possible worlds
        - Conservation would be a logical truth like "A = A"
        - Would be derivable from first principles of logic alone
        - No evidence supports this strongest claim
    
    2. **Metaphysical necessity** (□M): True in all possible physical worlds
        - Conservation would be true in any world with any physical laws
        - Would be grounded in the nature of existence itself
        - Contradicted by coherent models without conservation
    
    3. **Nomological necessity** (□N): True in all worlds with our laws of physics
        - Conservation follows from symmetry principles in our specific universe
        - Could be different in worlds with different fundamental laws
        - Consistent with current understanding of conservation's mathematical basis
    
    4. **Contingent truth** (◇): True in some possible worlds, false in others
        - Conservation holds in certain domains but fails in others
        - The strength of conservation varies with physical context
        - Supported by evidence from cosmology and quantum mechanics
    
    Using the formal axiom S5 of modal logic: □p → p (if necessarily p, then p), but not p → □p.
    Empirical evidence that energy conservation holds in some contexts (p) does not imply it necessarily holds in all contexts (□p).
    """)
    
    # Create modal logic table
    modal_table = pd.DataFrame({
        'Modal Status': ['Logical necessity', 'Metaphysical necessity', 'Nomological necessity', 'Contingent truth'],
        'Description': ['True in all logically possible worlds', 'True in all metaphysically possible worlds', 'True in all worlds with our laws of physics', 'True in some worlds, false in others'],
        'Evidence for Energy Conservation': ['None', 'None', 'Strong within specific domains', 'Applies to our universe with certain conditions']
    })
    
    st.table(modal_table)
    
    st.markdown("""
    ### Advanced Logical Formulation
    
    Let us rigorously analyze the absolutist position on energy conservation using predicate logic and modal operators:
    
    **Fundamental Definitions:**
    - Let E(x,t) represent the total energy of a system x at time t
    - Let C(x) represent "x is a closed system"
    - Let T(t₁,t₂) represent the time interval from t₁ to t₂
    
    **The Absolutist Position on Energy Conservation can be formalized as:**
    
    ∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))]
    
    Which reads: "For all systems x and for all times t₁ and t₂, if x is a closed system, then the energy of x at t₁ equals the energy of x at t₂."
    
    **Modal Extension:**
    
    □(∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))])
    
    Which asserts the necessity of the conservation principle across all possible worlds.
    
    **Alethic Status Analysis:**
    
    The absolutist position can be deconstructed through logical analysis of its alethic status:
    
    1. **The Law of Non-Contradiction (LNC):**
       ¬◇(p ∧ ¬p)
       
       If energy conservation were logically necessary, any violation would constitute a logical contradiction. However, no such contradiction has been demonstrated.
    
    2. **Hume's Dictum on Modal Segregation:**
       ¬□(∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))])
       
       There is no logical contradiction in conceiving a world where energy is not conserved, demonstrating the synthetic rather than analytic nature of conservation laws.
    
    3. **Transcendental Argument Assessment:**
    
       Let P represent "Energy conservation is absolute"
       Let Q represent "Scientific inquiry is possible"
       
       The transcendental argument structure:
       (1) Q
       (2) P → Q
       (3) Therefore, P
       
       Critical analysis reveals the invalidity of premise (2): Scientific inquiry does not presuppose absolute energy conservation, but only methodological regularities that may admit contextual exceptions.
    
    4. **Mereological Fallacy Identification:**
    
       Let W represent the entire universe
       Let S represent a subsystem of the universe
       
       The absolutist inference structure:
       (1) ∀S∀t₁∀t₂[C(S) → (E(S,t₁) = E(S,t₂))]
       (2) C(W)
       (3) Therefore, ∀t₁∀t₂[E(W,t₁) = E(W,t₂)]
       
       This commits the fallacy of composition, as properties of proper subsystems cannot be validly generalized to the whole of which they are parts, particularly when considering emergent properties of complex systems.
    
    5. **Ontological Category Analysis:**
    
       The absolutist position presupposes energy as a substance (ousia) rather than a relation or process.
       
       From Aristotelian categories:
       - If energy is substance: ∃x[Energy(x) ∧ ∀y(Inheres-in(y,x) → y=x)]
       - If energy is relation: ∃x∃y[Energy-relation(x,y)]
       
       The latter ontological categorization better accommodates modern physics, undermining the metaphysical basis for absolute conservation.
    """)
    
    st.markdown("""
    ### Formal Ontological Framework
    
    **Meinongian Considerations:**
    
    The ontological status of energy quantities in non-conserved scenarios can be analyzed through Meinongian object theory:
    
    1. **The Principle of Independence (PI):**
       ∀x[∃(x) ↔ ∃y(y=x)]
       
       Where ∃(x) denotes "x exists" and ∃y denotes standard existential quantification.
       
       Under PI, non-conserved energy values have determinate properties regardless of their existential status, permitting coherent discourse about energy creation or destruction.
    
    2. **The Characterization Principle (CP):**
       ∀x∀F[x exemplifies F ↔ F is in the nuclear content of x]
       
       A modified CP accommodates energy violations by distinguishing between nuclear and extranuclear properties, where conservation becomes an extranuclear rather than constitutive property of energy.
    
    **Phenomenological Reduction Analysis:**
    
    Applying Husserlian phenomenological reduction to energy conservation:
    
    1. **Epoché toward the absolutist stance:**
       Suspending the natural attitude that presupposes energy conservation as metaphysically necessary.
    
    2. **Eidetic analysis of energy phenomena:**
       ∀E[□(E is energy → E has determinate magnitude) ∧ ¬□(E is energy → E is conserved)]
       
       The invariant essence of energy includes its measurability but not its conservation.
    
    3. **Transcendental-phenomenological constitution:**
       Energy conservation emerges as a constituted rather than constituting principle within the scientific lifeworld.
    
    **Structural Realist Reformulation:**
    
    From an ontic structural realist perspective:
    
    1. The fundamental ontology consists of structures rather than objects:
       ∀x[Physical(x) → ∃S(Structure(S) ∧ Instantiates(x,S))]
    
    2. Energy conservation is redefined as a structural invariant:
       ∀S∀D[Domain(D) ∧ Applies(S,D) ∧ HasSymmetry(D,time-translation) → HasInvariant(S,energy)]
    
    3. The conditional nature becomes explicit:
       ¬∀D[Domain(D) → HasSymmetry(D,time-translation)]
    
    This reformulation accommodates both conservation in symmetric contexts and non-conservation where symmetry breaks.
    """)
    
    st.markdown("""
    ### Historical Precedents of Scientific "Laws" Being Revised
    
    Many formerly "absolute" scientific principles have been contextualized or limited:
    
    1. **Newtonian Mechanics**: Absolute space and time → Relativistic spacetime
    
    2. **Conservation of Mass**: Absolute conservation → Mass-energy equivalence
    
    3. **Principle of Determinism**: Absolute determinism → Quantum indeterminacy
    
    4. **Euclidean Geometry**: Universal → One of many possible geometries
    
    This suggests caution in asserting the absolute status of any scientific principle, including energy conservation.
    """)

def display_logical_fallacies_slide():
    """Display the logical fallacies slide."""
    display_slide_header(t("logical_title"), 
                        t("logical_subtitle"))
    
    st.markdown("""
    ### Common Logical Fallacies in Energy Conservation Arguments
    
    Several logical fallacies appear in arguments for absolute energy conservation:
    """)
    
    # Create a dataframe with fallacies
    fallacies = pd.DataFrame({
        'Fallacy': [
            'Appeal to Authority',
            'Circular Reasoning',
            'No True Scotsman',
            'Moving the Goalposts',
            'Fallacy of Composition',
            'Appeal to Tradition'
        ],
        'Description': [
            'Claiming energy conservation must be true because famous physicists said so',
            'Energy must be conserved because we define systems where it appears missing as "open"',
            'Dismissing apparent violations by redefining what counts as a proper physical system',
            'Changing the definition of energy when conservation appears to fail',
            'Assuming what\'s true of isolated systems must be true of the universe as a whole',
            'Assuming energy conservation must be true because it\'s been accepted for centuries'
        ],
        'Example': [
            '"Feynman said energy conservation is absolute, so it must be"',
            '"Dark energy doesn\'t violate conservation because the system isn\'t closed"',
            '"Any system showing energy non-conservation must be improperly defined"',
            '"In cosmology, energy includes negative gravitational potential energy"',
            '"Since energy is conserved in laboratories, it must be conserved in the expanding universe"',
            '"Energy conservation has been a pillar of physics for 200 years and can\'t be questioned"'
        ]
    })
    
    st.table(fallacies)
    
    st.markdown("""
    ### Formal Logical Analysis
    
    Let\'s formalize the standard argument for absolute energy conservation:
    
    1. All known isolated systems conserve energy (empirical premise)
    2. The universe is an isolated system (definitional premise)
    3. Therefore, the universe conserves energy (conclusion)
    
    This argument has three weaknesses:
    
    1. **Inductive Gap**: Observations of some systems don\'t guarantee the same for all systems
    2. **Unfalsifiability**: "Isolated system" is often defined as one that conserves energy (circular)
    3. **Category Error**: The universe may not be comparable to subsystems within it
    
    ### Bayesian Analysis
    
    We can apply Bayesian reasoning to energy conservation:
    """)
    
    # Create a probability chart showing Bayesian update
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Data for probabilistic belief update
    evidence_points = ['Initial belief', 'Classical experiments', 'Special relativity', 
                      'Quantum mechanics', 'General relativity', 'Cosmology', 'Current state']
    
    # Probabilities of absolute conservation after each evidence
    absolute_probs = [0.5, 0.9, 0.85, 0.7, 0.5, 0.3, 0.2]
    
    # Probabilities of contextual conservation after each evidence
    contextual_probs = [0.3, 0.35, 0.5, 0.65, 0.8, 0.9, 0.95]
    
    # Create x positions
    x = np.arange(len(evidence_points))
    width = 0.35
    
    # Create bars
    ax.bar(x - width/2, absolute_probs, width, label='P(Absolute Conservation)')
    ax.bar(x + width/2, contextual_probs, width, label='P(Contextual Conservation)')
    
    # Add labels and title
    ax.set_ylabel('Probability')
    ax.set_title('Bayesian Update of Beliefs About Energy Conservation')
    ax.set_xticks(x)
    ax.set_xticklabels(evidence_points, rotation=45, ha='right')
    ax.legend()
    
    plt.tight_layout()
    
    st.pyplot(fig)
    
    st.markdown("""
    This Bayesian analysis shows how rational belief in absolute conservation should decrease
    as we encounter evidence from quantum mechanics, general relativity, and cosmology.
    
    ### Argument from Symmetry
    
    One of the strongest arguments for a form of energy conservation comes from Noether's theorem:
    
    1. Time-translation symmetry implies energy conservation
    2. Time-translation symmetry may not hold in all contexts (e.g., expanding universe)
    3. Therefore, absolute energy conservation cannot be guaranteed in all contexts
    
    This more nuanced approach preserves the connection between conservation and symmetry
    while acknowledging the potential for exceptions in contexts without the relevant symmetry.
    """)

def display_formal_logic_slide():
    """Display the formal logic and advanced philosophical arguments slide."""
    display_slide_header("Rigorous Formal Analysis", 
                        "Advanced logical and ontological arguments")
    
    st.markdown("""
    ### Formal Modal Logic Analysis
    
    Let us rigorously analyze energy conservation claims using formal modal logic:
    
    **Symbolic Definitions:**
    - Let E(x,t) represent the total energy of a system x at time t
    - Let C(x) represent "x is a closed system"
    - Let T(t₁,t₂) represent the time interval from t₁ to t₂
    
    **The Strong Conservation Thesis (SCT) formalized:**
    
    ∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))]
    
    Which reads: "For all systems x and for all times t₁ and t₂, if x is a closed system, then the energy of x at t₁ equals the energy of x at t₂."
    
    **Modal Extension (Necessity Claim):**
    
    □(∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))])
    
    Which asserts the necessity of the conservation principle across all possible worlds.
    
    **The Weak Conservation Thesis (WCT) formalized:**
    
    ∀x∀t₁∀t₂[C(x) ∧ S(x) → (E(x,t₁) = E(x,t₂))]
    
    Where S(x) is the condition "x exhibits time-translation symmetry"
    
    **Modal Logic Refutation:**
    
    Using Kripke semantics and S5 modal system:
    
    1. Possible worlds semantics allows us to construct a model M = ⟨W, R, V⟩ where:
       - W is a set of possible worlds
       - R is an accessibility relation between worlds
       - V is a valuation function assigning truth values

    2. For SCT to be necessarily true: ∀w ∈ W, M, w ⊨ ∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))]
    
    3. Countermodel construction:
       - w₁: A world with our physical laws but expanding spacetime
       - In w₁, ∃x∃t₁∃t₂[C(x) ∧ (E(x,t₁) ≠ E(x,t₂))]
       - Therefore, M, w₁ ⊭ ∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))]
       - Thus, ¬□(∀x∀t₁∀t₂[C(x) → (E(x,t₁) = E(x,t₂))])
       
    4. QED: The Strong Conservation Thesis is not necessarily true.
    """)
    
    st.markdown("""
    ### Ontological Status Analysis
    
    **Meinongian Object Theory Application:**
    
    The ontological status of energy in non-conservative scenarios:
    
    1. **The Principle of Independence (PI):**
       ∀x[∃(x) ↔ ∃y(y=x)]
       
       Where ∃(x) denotes "x exists" and ∃y denotes standard existential quantification.
       
       Under PI, non-conserved energy values have determinate properties regardless of existential status.
    
    2. **Modified Characterization Principle (CP):**
       ∀x∀F[x exemplifies F ↔ F is in the nuclear content of x]
       
       Distinguishes between nuclear and extranuclear properties of energy:
       - Nuclear: having magnitude, being capable of transformation
       - Extranuclear: being conserved, being eternal
       
    **Phenomenological Analysis:**
    
    Applying Husserlian phenomenology to energy conservation:
    
    1. **Epoché** (ἐποχή) - suspension of the natural attitude that assumes conservation
    
    2. **Eidetic reduction** yields the essence (εἶδος) of energy:
       ∀E[□(E is energy → E has determinate magnitude) ∧ ¬□(E is energy → E is conserved)]
       
       Conservation is not part of the invariant essence of energy.
    
    3. **Transcendental constitution:**
       Energy conservation emerges as a constituted rather than constituting principle.
    """)
    
    st.markdown("""
    ### Structural Realist Framework
    
    From ontic structural realism (OSR):
    
    1. **Fundamental ontology of structures:**
       ∀x[Physical(x) → ∃S(Structure(S) ∧ Instantiates(x,S))]
    
    2. **Energy conservation as conditional structural invariant:**
       ∀S∀D[Domain(D) ∧ Applies(S,D) ∧ HasSymmetry(D,time-translation) → HasInvariant(S,energy)]
    
    3. **The conditional nature of symmetry:**
       ¬∀D[Domain(D) → HasSymmetry(D,time-translation)]
    
    **Category Theory Formulation:**
    
    1. Let Phys be the category of physical systems
    2. Let Sym(x) be the monoid of symmetries of x ∈ Phys
    3. Let Inv(x) be the set of invariants of x ∈ Phys
    
    Conservation is a natural transformation:
    
    η: Sym ⟹ Inv
    
    where for each physical system x:
    
    ηₓ: Sym(x) → Inv(x)
    
    For time-translation symmetry τ ∈ Sym(x), ηₓ(τ) = energy conservation
    
    This categorical formulation reveals energy conservation as derivative from symmetry structure rather than fundamental.
    """)
    
    # Create a table for different philosophical frameworks
    frameworks = pd.DataFrame({
        'Philosophical Framework': [
            'Analytical Modal Logic',
            'Meinongian Object Theory',
            'Husserlian Phenomenology',
            'Ontic Structural Realism',
            'Category Theory'
        ],
        'Core Insight on Energy Conservation': [
            'Not logically or metaphysically necessary',
            'Conservation is an extranuclear property',
            'Not part of energy\'s invariant essence',
            'Derivative from symmetry conditions',
            'Natural transformation dependent on structure'
        ]
    })
    
    st.table(frameworks)
    
    st.markdown("""
    ### Meta-Scientific Analysis
    
    **Carnap's Principle of Tolerance applied to energy discourse:**
    
    1. Linguistic frameworks for discussing energy:
       - L₁: Framework where conservation is a synthetic a priori principle
       - L₂: Framework where conservation is a context-dependent regularity
    
    2. By Carnap's principle:
       - Internal questions within L₁ presuppose conservation
       - External questions about choosing L₁ vs L₂ are pragmatic
       - No "fact of the matter" about absolute conservation independent of framework choice
    
    **Quine's Web of Belief analogy:**
    
    1. Energy conservation positioned near center of web
    2. Revision possible if sufficient pressure from periphery
    3. Quantifying revision cost vs explanatory benefit:
    
       U = E - C
       
       Where:
       - U = Utility of theory modification
       - E = Explanatory power gained
       - C = Conceptual cost of revision
    
    **Kuhnian Analysis of Potential Paradigm Shift:**
    
    1. Current anomalies challenging conservation paradigm
    2. Incommensurability between absolutist and contextualist frameworks
    3. Potential for revolutionary transition in scientific understanding
    """)

def display_metaphysical_arguments_slide():
    """Display the metaphysical arguments slide."""
    display_slide_header(t("metaphysical_title"), 
                        t("metaphysical_subtitle"))
    
    st.markdown("""
    ### Temporality and Eternity
    
    The claim that "energy is eternal" can be analyzed from several metaphysical perspectives:
    
    1. **Temporal eternalism**: Energy exists at all times
        - Challenged by Big Bang cosmology (beginning of time)
        - Challenged by potential "heat death" or "Big Rip" scenarios
    
    2. **Atemporal existence**: Energy exists outside of time
        - Category error: energy is defined as capacity to do work over time
        - Contradicted by the temporal nature of energy transformations
    
    3. **Necessary existence**: Energy must exist in all possible worlds
        - Speculative claim beyond scientific evidence
        - Conflates physical law with metaphysical necessity
    """)
    
    # Create a chart comparing philosophical conceptions of time
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Data
    time_models = ['Presentism', 'Growing Block', 'Eternalism', 'Block Universe']
    implications = [
        'Only present energy exists',
        'Past & present energy exist',
        'Past, present & future energy exist',
        'Energy exists timelessly'
    ]
    compatibility = [0.7, 0.5, 0.3, 0.1]  # Compatibility with energy creation/destruction
    
    # Plot
    ax.barh(time_models, compatibility, color='blue')
    
    # Add implications as text
    for i, imp in enumerate(implications):
        ax.text(0.02, i, imp, va='center', color='white')
    
    # Set labels
    ax.set_xlabel('Compatibility with Energy Creation/Destruction')
    ax.set_title('Philosophical Models of Time & Energy Existence')
    
    plt.tight_layout()
    
    st.pyplot(fig)
    
    st.markdown("""
    ### Substance Metaphysics vs. Process Philosophy
    
    Two fundamentally different metaphysical approaches to energy reveal profound implications:
    
    1. **Substance metaphysics** (traditional Western view):
        - Energy as a "thing" or substance that persists through time (Aristotelian ousia)
        - Conservation as preservation of an underlying substantial nature
        - Conservation treated as a necessary truth about physical reality
        - Challenged by quantum field theory's virtual particles and vacuum fluctuations
        - Relies on a problematic notion of numerical identity across transformations
        - As Heraclitus' critique of Parmenides: can we find permanence in flux?
    
    2. **Process philosophy** (alternative view - Whitehead, Bergson, Deleuze):
        - Energy as a pattern of events, relations, and becomings rather than static being
        - Conservation as continuity of pattern and process, not preservation of substance
        - Conservation treated as contingent expression of relational stability
        - Accommodates both conservation and non-conservation as contextual features
        - Better aligned with modern physics' emphasis on fields, interactions, and events
        - Resonates with Eastern philosophical traditions (Buddhism's impermanence)
    
    3. **Dialectical materialism** (Marxist perspective):
        - Energy as manifestation of material contradictions and transformations
        - Conservation laws emerge from material conditions and historical development
        - Scientific concepts like energy emerge from material practice, not pure reason
        - Energy conservation may be historically contingent on specific forms of practice
    
    Process-oriented ontologies offer frameworks that can accommodate apparent violations
    of conservation while preserving the underlying patterns and relationships that physics
    describes. They avoid the metaphysical commitment to an eternal, unchanging substance
    that creates problems when confronted with quantum indeterminacy and cosmic expansion.
    
    ### The Status of Physical Laws
    
    Three positions on the metaphysical status of physical laws like energy conservation:
    """)
    
    # Create a comparison table of views on physical laws
    law_views = pd.DataFrame({
        'Position': ['Governing Laws', 'Systems of Regularities', 'Mathematical Descriptions'],
        'Description': [
            'Laws govern and constrain physical reality',
            'Laws describe regular patterns in phenomena',
            'Laws are mathematical models approximating reality'
        ],
        'Implications for Energy Conservation': [
            'Conservation is an absolute constraint on what can happen',
            'Conservation is a widespread pattern that could have exceptions',
            'Conservation is a useful approximation within certain domains'
        ]
    })
    
    st.table(law_views)
    
    st.markdown("""
    ### The Identity of Energy
    
    The concept of "same energy" across transformations raises metaphysical questions:
    
    1. **Qualitative identity**: Energy maintains the same properties
        - Challenged by transformations between different forms (e.g., kinetic to potential)
    
    2. **Numerical identity**: Energy is the same individual entity
        - Challenged by field theories where energy is distributed
    
    3. **Continuity of process**: Energy transformations follow continuous causal chains
        - Compatible with both conservation and non-conservation scenarios
    
    These distinctions suggest that energy "conservation" may be more about continuity
    of process than preservation of an identical substance.
    
    ### Emergence and Reduction
    
    1. **Reductionist view**: Energy conservation is fundamental
        - Conservation should apply at all levels
    
    2. **Emergentist view**: Different laws may apply at different scales
        - Conservation might be emergent rather than fundamental
        - Allows for different behavior in quantum, classical, and cosmological regimes
    
    The evidence increasingly supports a limited emergentist view, where energy conservation
    emerges as a useful principle within certain domains but may not be universally applicable.
    """)
    
    # Create a visualization of levels of reality and conservation
    levels = ['Quantum Scale', 'Particle Scale', 'Molecular Scale', 'Human Scale', 'Astronomical Scale', 'Cosmological Scale']
    conservation_strength = [0.3, 0.7, 0.9, 0.95, 0.7, 0.4]  # How strongly conservation applies
    
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(levels, conservation_strength, 'bo-', linewidth=2, markersize=10)
    
    # Add a horizontal line showing perfect conservation
    ax.axhline(y=1.0, color='r', linestyle='--', alpha=0.7, label='Perfect Conservation')
    
    # Add shaded region for "classical domain"
    ax.axvspan(2, 4, alpha=0.2, color='green', label='Classical Domain')
    
    # Set labels
    ax.set_xlabel('Scale of Physical Phenomena')
    ax.set_ylabel('Applicability of Energy Conservation')
    ax.set_title('Energy Conservation Across Scales: An Emergent Pattern')
    
    # Rotate x labels for readability
    plt.xticks(rotation=45)
    
    # Add legend
    ax.legend()
    
    plt.tight_layout()
    
    st.pyplot(fig)
