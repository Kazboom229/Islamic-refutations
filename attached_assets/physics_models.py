import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import plotly.express as px
from utils import create_equation

def virtual_particle_visualization():
    """Create visualization of quantum vacuum fluctuations."""
    # Generate a grid for the field
    x = np.linspace(0, 10, 100)
    y = np.linspace(0, 10, 100)
    X, Y = np.meshgrid(x, y)
    
    # Simulate a quantum field with fluctuations
    np.random.seed(42)  # For reproducibility
    Z = np.zeros_like(X)
    
    # Add multiple particle-antiparticle pairs as Gaussian peaks
    n_pairs = 15
    for _ in range(n_pairs):
        x0, y0 = np.random.uniform(0, 10, 2)
        sigma = np.random.uniform(0.2, 0.4)
        amplitude = np.random.uniform(0.5, 1.0)
        Z += amplitude * np.exp(-((X - x0)**2 + (Y - y0)**2) / (2 * sigma**2))
    
    # Create the figure
    fig = go.Figure(data=[go.Surface(z=Z, x=X, y=Y, 
                                    colorscale='Viridis',
                                    opacity=0.8)])
    
    # Update layout
    fig.update_layout(
        title='Quantum Vacuum Energy Fluctuations (Virtual Particles)',
        scene=dict(
            xaxis_title='Space',
            yaxis_title='Space',
            zaxis_title='Energy Density',
            camera=dict(eye=dict(x=1.5, y=1.5, z=1.2)),
        ),
        width=700,
        height=500,
    )
    
    # Add annotations
    fig.add_annotation(
        x=0.5,
        y=0.95,
        text="Each peak represents a virtual particle pair temporarily borrowing energy",
        showarrow=False,
        xref="paper",
        yref="paper"
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("""
    The visualization above shows energy density fluctuations in the quantum vacuum. 
    Each peak represents a virtual particle-antiparticle pair that temporarily "borrows" 
    energy from the vacuum, existing briefly before annihilating.
    
    This process is permitted by the energy-time uncertainty relation and represents a temporary
    violation of energy conservation from a classical perspective.
    """)

def spacetime_expansion_visualization():
    """Create visualization of energy in expanding spacetime."""
    # Create data for expanding space
    times = np.linspace(0, 10, 6)
    scale_factors = 1 + 0.2 * times
    
    # Set up the figure with subplots for each time
    fig, axes = plt.subplots(2, 3, figsize=(15, 8))
    axes = axes.flatten()
    
    # Create data for photon wavelength
    wave_x = np.linspace(0, 2*np.pi, 100)
    
    # Track total energy for system
    initial_energy = 1.0
    total_energies = []
    
    # Plot each time step
    for i, (t, a) in enumerate(zip(times, scale_factors)):
        if i < len(axes):
            # Plot the expanding grid (representing spacetime)
            grid_size = 5
            x_grid = np.linspace(0, grid_size, 6) * a
            y_grid = np.linspace(0, grid_size, 6) * a
            
            # Plot the grid
            for x in x_grid:
                axes[i].axvline(x, color='gray', alpha=0.5, linestyle=':')
            for y in y_grid:
                axes[i].axhline(y, color='gray', alpha=0.5, linestyle=':')
            
            # Plot a photon (shown as a wave)
            wave_amplitude = 0.5 / np.sqrt(a)  # Amplitude decreases with expansion
            wavelength = a  # Wavelength increases with expansion
            wave_y = wave_amplitude * np.sin(wave_x / wavelength * 2*np.pi) + grid_size/2
            
            axes[i].plot(wave_x * a, wave_y, 'r-', linewidth=2)
            
            # Calculate photon energy (E ∝ 1/λ)
            photon_energy = initial_energy/a  # Energy decreases as wavelength increases
            
            # Add an arrow showing the "lost" energy
            if i > 0:
                axes[i].arrow(grid_size*a*0.8, grid_size*a*0.8, 0, -0.5*a, 
                             head_width=0.2*a, head_length=0.1*a, fc='blue', ec='blue')
                axes[i].text(grid_size*a*0.8 + 0.1*a, grid_size*a*0.7, 
                            f'Energy "lost"\n{initial_energy - photon_energy:.2f}', 
                            color='blue')
            
            # Track total system energy
            total_energies.append(photon_energy)
            
            # Add time-dependent Lagrangian to illustrate breaking of time invariance
            lagrangian_text = f'$\\mathcal{{L}}(t) = \\mathcal{{L}}(q,\\dot{{q}},a(t))$'
            axes[i].text(grid_size*a*0.2, grid_size*a*0.1, lagrangian_text, fontsize=10)
            axes[i].text(grid_size*a*0.2, grid_size*a*0.2, f'Time symmetry broken\nby a(t) = {a:.2f}', fontsize=8)
            
            axes[i].set_title(f'Time: {t:.1f}, Scale: {a:.1f}, Photon Energy: {photon_energy:.2f}')
            axes[i].set_xlim(0, grid_size * a)
            axes[i].set_ylim(0, grid_size * a)
            axes[i].set_aspect('equal')
    
    plt.tight_layout()
    
    # Add a collective title
    fig.suptitle('Photon Energy Loss in Expanding Space: Breaking Time Invariance', fontsize=16, y=1.02)
    
    st.pyplot(fig)
    
    # Create additional graph showing energy decline over time
    fig2, ax2 = plt.subplots(figsize=(10, 5))
    ax2.plot(times, total_energies, 'bo-', linewidth=2, markersize=8)
    ax2.set_xlabel('Time')
    ax2.set_ylabel('Photon Energy')
    ax2.set_title('Photon Energy Decreases as Universe Expands')
    ax2.grid(True, alpha=0.3)
    
    # Add annotation explaining why energy conservation fails
    ax2.annotate('Energy conservation fails because\nexpanding space breaks time invariance', 
                xy=(5, total_energies[3]), xytext=(3, total_energies[0]*0.8),
                arrowprops=dict(facecolor='black', shrink=0.05, width=1.5, headwidth=8))
    
    st.pyplot(fig2)
    
    st.markdown("""
    This visualization demonstrates why energy is not conserved as space expands:
    
    ### Breaking the Mathematical Foundation of Energy Conservation
    
    1. **Time Symmetry Breaking**: 
       - Energy conservation requires time-translation invariance (Noether's theorem)
       - The scale factor a(t) explicitly depends on time in an expanding universe
       - This breaks the symmetry that guarantees energy conservation
    
    2. **Explicit Time Dependence in the Lagrangian**:
       - The Lagrangian $\mathcal{L}(q,\dot{q},a(t))$ now depends explicitly on time
       - This invalidates the mathematical derivation of energy conservation
       - No global time-like Killing vector exists to define a conserved energy
    
    ### Observational Consequences
    
    1. The grid represents expanding space (scale factor increases with time)
    2. The red wave represents a photon traveling through space
    3. As space expands, the photon's wavelength stretches (cosmological redshift)
    4. The photon's energy decreases (E ∝ 1/λ) without being transferred to another system
    
    This is a direct result of breaking time symmetry. In accelerating expansion (like our universe), 
    even accounting tricks like "the energy goes into the gravitational field" become untenable, 
    as the total energy of the universe demonstrably increases over time with no identifiable source.
    """)

def quantum_fluctuation_visualization():
    """Create visualization of energy fluctuations from uncertainty principle."""
    # Generate time values
    t = np.linspace(0, 10, 1000)
    
    # Set up the figure
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Create energy values with fluctuations
    np.random.seed(42)  # For reproducibility
    
    # Plot classical constant energy
    classical_energy = np.ones_like(t) * 5
    
    # Create quantum fluctuations with varying time-energy uncertainty
    # Short timescale = large fluctuations
    fluctuation_scale = 1 / (0.1 + t/5)  # Decreases with time (longer observation)
    quantum_energy = classical_energy + np.random.normal(0, fluctuation_scale, size=len(t))
    
    # Draw uncertainty bands
    uncertainty = fluctuation_scale * 2
    
    # Plot
    ax.plot(t, classical_energy, 'k--', label='Classical Energy (Constant)')
    ax.plot(t, quantum_energy, 'b-', label='Quantum Energy (with fluctuations)')
    ax.fill_between(t, classical_energy - uncertainty, classical_energy + uncertainty, 
                   color='blue', alpha=0.2, label='Uncertainty Range (ΔE)')
    
    # Add annotations
    ax.annotate('Short timescale:\nLarge energy uncertainty',
              xy=(0.5, 7), xytext=(0.5, 8.5),
              arrowprops=dict(facecolor='black', shrink=0.05, width=1.5, headwidth=8))
    
    ax.annotate('Long timescale:\nSmaller energy uncertainty',
              xy=(9, 5.5), xytext=(7, 7),
              arrowprops=dict(facecolor='black', shrink=0.05, width=1.5, headwidth=8))
    
    # Set plot properties
    ax.set_xlabel('Time (Observation Duration)')
    ax.set_ylabel('Energy')
    ax.set_title('Energy Fluctuations and the Uncertainty Principle')
    ax.legend(loc='upper right')
    ax.grid(True, alpha=0.3)
    ax.set_ylim(0, 10)
    
    # Add the uncertainty relation as text
    ax.text(5, 1, r'$\Delta E \cdot \Delta t \geq \frac{\hbar}{2}$', 
           bbox=dict(facecolor='white', alpha=0.8), fontsize=14, ha='center')
    
    st.pyplot(fig)
    
    st.markdown("""
    This visualization demonstrates the energy-time uncertainty relation:
    
    1. The dashed line represents classical constant energy
    2. The blue line shows quantum energy with fluctuations
    3. The blue shaded region represents the uncertainty in energy (ΔE)
    
    Key observations:
    - At short timescales (small Δt), energy fluctuations can be large
    - As observation time increases (large Δt), energy is more precisely defined
    - These fluctuations don't violate conservation on average but allow temporary "loans"
    
    This is the physical basis for virtual particles and many quantum effects that appear to
    violate classical energy conservation.
    """)

def dark_energy_visualization():
    """Create visualization of dark energy and its challenge to conservation."""
    # Create data for different types of energy density evolution
    a_values = np.linspace(0.1, 2, 100)  # Scale factor (1 = present day)
    
    # Different types of energy density evolution with scale factor
    matter_density = 1/a_values**3  # Matter: ρ ∝ a^-3
    radiation_density = 1/a_values**4  # Radiation: ρ ∝ a^-4
    dark_energy_density = np.ones_like(a_values)  # Dark energy: ρ = constant
    
    # Total energy in a comoving volume (scale with a^3)
    matter_energy = matter_density * a_values**3  # Constant (conserved)
    radiation_energy = radiation_density * a_values**3  # Decreases as a^-1
    dark_energy = dark_energy_density * a_values**3  # Increases as a^3
    
    # Create the figure
    fig = go.Figure()
    
    # Add traces for energy density
    fig.add_trace(go.Scatter(x=a_values, y=matter_density, 
                            mode='lines', name='Matter Density',
                            line=dict(color='blue', dash='dash')))
    
    fig.add_trace(go.Scatter(x=a_values, y=radiation_density, 
                            mode='lines', name='Radiation Density',
                            line=dict(color='red', dash='dash')))
    
    fig.add_trace(go.Scatter(x=a_values, y=dark_energy_density, 
                            mode='lines', name='Dark Energy Density',
                            line=dict(color='purple', dash='dash')))
    
    # Add traces for total energy
    fig.add_trace(go.Scatter(x=a_values, y=matter_energy, 
                            mode='lines', name='Matter Energy (conserved)',
                            line=dict(color='blue')))
    
    fig.add_trace(go.Scatter(x=a_values, y=radiation_energy, 
                            mode='lines', name='Radiation Energy (decreases)',
                            line=dict(color='red')))
    
    fig.add_trace(go.Scatter(x=a_values, y=dark_energy, 
                            mode='lines', name='Dark Energy (increases)',
                            line=dict(color='purple')))
    
    # Add layout
    fig.update_layout(
        title='Energy Density and Total Energy vs. Universe Scale Factor',
        xaxis_title='Scale Factor a (1 = present day)',
        yaxis_title='Relative Value',
        yaxis_type='log',
        legend=dict(
            x=0.01,
            y=0.99,
            bordercolor='Black',
            borderwidth=1
        )
    )
    
    # Add vertical line for present day
    fig.add_shape(
        type='line',
        x0=1, y0=0.1, x1=1, y1=100,
        line=dict(color='black', width=1, dash='dot')
    )
    fig.add_annotation(
        x=1, y=0.15,
        text='Present Day',
        showarrow=False
    )
    
    # Add annotation for dark energy challenge
    fig.add_annotation(
        x=1.5, y=5,
        text="Dark energy increases with space expansion,<br>challenging energy conservation",
        showarrow=True,
        arrowhead=1,
        ax=40,
        ay=-40
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("""
    This graph illustrates how different energy forms behave as the universe expands:
    
    1. **Matter** (blue): 
       - Density decreases as a^-3 (dilutes with volume)
       - Total energy remains constant (conserved)
    
    2. **Radiation** (red): 
       - Density decreases as a^-4 (dilutes + redshift)
       - Total energy decreases as a^-1
    
    3. **Dark Energy** (purple): 
       - Density remains constant 
       - Total energy increases proportionally to volume
    
    The challenge to conservation comes from dark energy's behavior: 
    As the universe expands, the total dark energy increases with no identified source.
    
    This represents a fundamental challenge to the standard formulation of energy conservation.
    """)

def black_hole_thermodynamics_visualization():
    """Create visualization of black hole evaporation and its energy implications."""
    # Data for black hole mass vs time and temperature vs time
    time = np.linspace(0, 10, 100)
    
    # Stephen Hawking's equations for black hole evaporation
    # M(t) = M_0 * (1 - t/t_evap)^(1/3)
    # Where t_evap is the evaporation time
    
    initial_mass = 1.0
    evaporation_time = 10  # Set to our max time for visualization
    
    mass = initial_mass * (1 - time/evaporation_time)**(1/3)
    
    # Temperature is inversely proportional to mass
    temperature = 1 / mass
    
    # Radiation output is proportional to T^4 / M^2
    radiation = temperature**4
    
    # Create the figure with two y-axes
    fig, ax1 = plt.subplots(figsize=(10, 6))
    
    # Plot mass on first axis
    ax1.set_xlabel('Time')
    ax1.set_ylabel('Black Hole Mass', color='blue')
    ax1.plot(time, mass, 'b-', label='Mass')
    ax1.tick_params(axis='y', labelcolor='blue')
    ax1.set_ylim(0, 1.1)
    
    # Create a second y-axis for temperature
    ax2 = ax1.twinx()
    ax2.set_ylabel('Hawking Radiation Temperature', color='red')
    ax2.plot(time, temperature, 'r-', label='Temperature')
    ax2.tick_params(axis='y', labelcolor='red')
    
    # Create a third y-axis for radiation output
    ax3 = ax1.twinx()
    ax3.spines['right'].set_position(('outward', 60))
    ax3.set_ylabel('Radiation Emission Rate', color='green')
    ax3.plot(time, radiation, 'g-', label='Radiation')
    ax3.tick_params(axis='y', labelcolor='green')
    
    # Title
    plt.title('Black Hole Evaporation via Hawking Radiation')
    
    # Add annotations
    plt.annotate('Black hole mass decreases', xy=(5, 0.7), xytext=(3, 0.5),
                arrowprops=dict(facecolor='blue', shrink=0.05))
    
    plt.annotate('Temperature increases', xy=(7, 1.5), xytext=(5, 2),
                arrowprops=dict(facecolor='red', shrink=0.05))
    
    plt.annotate('Radiation accelerates', xy=(8, 4), xytext=(6, 5),
                arrowprops=dict(facecolor='green', shrink=0.05))
    
    # Add legend
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    lines3, labels3 = ax3.get_legend_handles_labels()
    ax1.legend(lines1 + lines2 + lines3, labels1 + labels2 + labels3, loc='upper right')
    
    plt.tight_layout()
    
    st.pyplot(fig)
    
    st.markdown("""
    This visualization shows the process of black hole evaporation through Hawking radiation:
    
    1. As time progresses, the black hole loses mass (blue line)
    2. The temperature of the emitted radiation increases (red line)
    3. The rate of radiation emission accelerates (green line)
    
    Key energy conservation challenges:
    
    - Information appears to be destroyed or transformed in a way that's difficult to account for
    - The entropy/energy relationship becomes problematic at the final stages of evaporation
    - The connection between the original matter's organization and the final radiation state is lost
    
    This process highlights how energy conservation becomes problematic near spacetime singularities
    and in contexts where information and energy interact in complex ways.
    """)
