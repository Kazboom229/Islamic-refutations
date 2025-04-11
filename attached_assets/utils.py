import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
# We don't need IPython display for Streamlit

def create_equation(latex_string):
    """Display LaTeX equation with proper formatting."""
    st.markdown(f"$${latex_string}$$")

def display_slide_header(title, subtitle=None):
    """Display a consistent header for slides."""
    st.title(title)
    if subtitle:
        st.markdown(f"*{subtitle}*")
    st.markdown("---")

def create_two_column_chart(title, left_data, right_data, left_title, right_title):
    """Create a two-column chart for comparing concepts."""
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader(left_title)
        st.write(left_data)
        
    with col2:
        st.subheader(right_title)
        st.write(right_data)

def create_comparison_table(data_dict):
    """Create a formatted comparison table."""
    headers = list(data_dict.keys())
    rows = []
    
    # Find the maximum number of items in any list
    max_items = max(len(items) for items in data_dict.values())
    
    # Fill each list to the max length with empty strings
    for header in headers:
        data_dict[header] = data_dict[header] + [''] * (max_items - len(data_dict[header]))
        
    # Create rows
    for i in range(max_items):
        row = []
        for header in headers:
            row.append(data_dict[header][i])
        rows.append(row)
    
    # Create and style the table
    table_html = "<table style='width:100%; border-collapse: collapse;'>"
    
    # Add header row
    table_html += "<tr>"
    for header in headers:
        table_html += f"<th style='border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;'>{header}</th>"
    table_html += "</tr>"
    
    # Add data rows
    for row in rows:
        table_html += "<tr>"
        for cell in row:
            table_html += f"<td style='border: 1px solid #ddd; padding: 8px;'>{cell}</td>"
        table_html += "</tr>"
        
    table_html += "</table>"
    
    st.markdown(table_html, unsafe_allow_html=True)

def create_timeline(events_dict):
    """Create a visual timeline of events."""
    fig, ax = plt.subplots(figsize=(12, 6))
    
    years = list(events_dict.keys())
    descriptions = list(events_dict.values())
    
    # Convert years to numeric values for plotting
    if isinstance(years[0], str):
        # If years are strings (e.g., "1905"), convert to integers
        numeric_years = [int(y) if y.isdigit() else i for i, y in enumerate(years)]
    else:
        numeric_years = years
    
    # Plot events as points
    ax.scatter(numeric_years, [1] * len(numeric_years), s=100, color='blue')
    
    # Add event descriptions
    for i, (year, desc) in enumerate(zip(numeric_years, descriptions)):
        ax.annotate(f"{year}: {desc}", 
                  xy=(year, 1), 
                  xytext=(0, (-1)**i * 20),  # Alternate up and down
                  textcoords="offset points",
                  ha='center', 
                  va='center',
                  bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8),
                  arrowprops=dict(arrowstyle="->"))
    
    # Set limits and remove y-axis
    ax.set_ylim(0, 2)
    ax.set_yticks([])
    
    # Format x-axis if using actual years
    if isinstance(years[0], str) and years[0].isdigit():
        ax.set_xticks(numeric_years)
        ax.set_xticklabels(years)
    
    ax.set_title("Timeline of Developments")
    
    return fig
