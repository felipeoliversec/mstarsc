using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MStarSupply.Data;
using MStarSupply.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MStarSupply.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntradasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EntradasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entrada>>> GetEntradas()
        {
            return await _context.Entradas.Include(e => e.Mercadoria).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Entrada>> GetEntrada(int id)
        {
            var entrada = await _context.Entradas.Include(e => e.Mercadoria).FirstOrDefaultAsync(e => e.Id == id);

            if (entrada == null)
            {
                return NotFound();
            }

            return entrada;
        }

        [HttpPost]
        public async Task<ActionResult<Entrada>> PostEntrada([FromBody] Entrada entrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entradas.Add(entrada);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetEntrada), new { id = entrada.Id }, entrada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntrada(int id, [FromBody] Entrada entrada)
        {
            if (id != entrada.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(entrada).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntradaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(500, "Internal server error");
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntrada(int id)
        {
            var entrada = await _context.Entradas.FindAsync(id);
            if (entrada == null)
            {
                return NotFound();
            }

            _context.Entradas.Remove(entrada);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntradaExists(int id)
        {
            return _context.Entradas.Any(e => e.Id == id);
        }
    }
}
