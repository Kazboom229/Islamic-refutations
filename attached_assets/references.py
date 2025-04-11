import streamlit as st
from utils import display_slide_header
from translations import get_translation

def t(key):
    """Translate a key using the current language."""
    return get_translation(key, st.session_state.language)

def display_references():
    """Display the references and further reading slide."""
    display_slide_header(t("references_title"), 
                        t("references_subtitle"))
    
    st.markdown("""
    ### Physics References
    
    **Quantum Mechanics:**
    
    1. Feynman, R. P. (1985). *QED: The Strange Theory of Light and Matter*. Princeton University Press.
    
    2. Griffiths, D. J. (2017). *Introduction to Quantum Mechanics* (3rd ed.). Cambridge University Press.
    
    3. Rae, A. I. M. (2008). *Quantum Mechanics* (5th ed.). Taylor & Francis.
    
    4. Weinberg, S. (2015). *Lectures on Quantum Mechanics* (2nd ed.). Cambridge University Press.
    
    **General Relativity and Cosmology:**
    
    5. Carroll, S. (2019). *Spacetime and Geometry: An Introduction to General Relativity*. Cambridge University Press.
    
    6. Misner, C. W., Thorne, K. S., & Wheeler, J. A. (2017). *Gravitation*. Princeton University Press.
    
    7. Weinberg, S. (2008). *Cosmology*. Oxford University Press.
    
    8. Peebles, P. J. E. (1993). *Principles of Physical Cosmology*. Princeton University Press.
    
    **Energy Conservation:**
    
    9. Noether, E. (1918). "Invariante Variationsprobleme". *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, Mathematisch-Physikalische Klasse*. 1918: 235–257.
    
    10. Chandrasekhar, S. (1995). *Newton's Principia for the Common Reader*. Oxford University Press.
    
    11. Coopersmith, J. (2015). *Energy, the Subtle Concept: The Discovery of Feynman's Blocks from Leibniz to Einstein*. Oxford University Press.
    
    ### Philosophical References
    
    **Philosophy of Physics:**
    
    12. Maudlin, T. (2012). *Philosophy of Physics: Space and Time*. Princeton University Press.
    
    13. Sklar, L. (1992). *Philosophy of Physics*. Oxford University Press.
    
    14. Lange, M. (2002). *An Introduction to the Philosophy of Physics: Locality, Fields, Energy, and Mass*. Wiley-Blackwell.
    
    **Metaphysics:**
    
    15. Lewis, D. K. (1986). *On the Plurality of Worlds*. Blackwell Publishers.
    
    16. Sider, T. (2011). *Writing the Book of the World*. Oxford University Press.
    
    17. Ladyman, J., & Ross, D. (2007). *Every Thing Must Go: Metaphysics Naturalized*. Oxford University Press.
    
    **Process Philosophy:**
    
    18. Whitehead, A. N. (1929). *Process and Reality*. Free Press.
    
    19. Rescher, N. (2000). *Process Philosophy: A Survey of Basic Issues*. University of Pittsburgh Press.
    
    ### Research Papers
    
    20. Hoefer, C. (2000). "Energy Conservation in GTR". *Studies in History and Philosophy of Modern Physics*, 31(2), 187-199.
    
    21. Curiel, E. (2000). "The Constraints General Relativity Places on Physicalist Accounts of Causality". *Theoria*, 15(1), 33-58.
    
    22. Earman, J. (2003). "The Cosmological Constant, the Fate of the Universe, Unimodular Gravity, and all that". *Studies in History and Philosophy of Modern Physics*, 34(4), 559-577.
    
    23. Stoica, O. C. (2015). "Revisiting the Black Hole Entropy and the Information Paradox". *arXiv:1506.01980*.
    
    24. Adami, C. (2012). "The Physics of Information". *Philosophical Transactions of the Royal Society A: Mathematical, Physical and Engineering Sciences*, 370, 3672-3673.
    
    ### Books on Conservation Laws
    
    25. Hanc, J., Tuleja, S., & Hancova, M. (2003). "Symmetries and conservation laws: Consequences of Noether's theorem". *American Journal of Physics*, 71(5), 386-391.
    
    26. Mills, R. (2006). *Space, Time and Quanta: An Introduction to Contemporary Physics*. W. H. Freeman.
    
    27. Dougherty, J., & Callender, C. (Eds.). (2011). *The Oxford Handbook of Philosophy of Physics*. Oxford University Press.
    
    28. Butterfield, J., & Earman, J. (Eds.). (2007). *Philosophy of Physics*. Elsevier.
    """)
    
    st.markdown("""
    ### Online Resources
    
    1. Stanford Encyclopedia of Philosophy: ["Symmetry and Symmetry Breaking"](https://plato.stanford.edu/entries/symmetry-breaking/)
    
    2. PhilSci Archive: [Philosophy of Physics articles](http://philsci-archive.pitt.edu/view/subjects/physics.html)
    
    3. ArXiv: [Quantum Physics](https://arxiv.org/archive/quant-ph) and [General Relativity & Quantum Cosmology](https://arxiv.org/archive/gr-qc)
    
    4. PBS Space Time: [YouTube series on physics concepts](https://www.youtube.com/c/pbsspacetime)
    
    5. SEP: ["Laws of Nature"](https://plato.stanford.edu/entries/laws-of-nature/)
    """)
    
    st.markdown("""
    ### Citation Note
    
    This presentation synthesizes arguments and evidence from the referenced sources but does not claim
    to represent the definitive scientific consensus. The goal is to explore the boundaries and limitations
    of energy conservation principles as understood in contemporary physics and philosophy.
    
    For specific claims made in this presentation, please refer to the primary sources listed above
    for detailed derivations, evidence, and context.
    """)
