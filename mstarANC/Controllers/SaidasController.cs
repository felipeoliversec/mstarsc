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
    public class SaidasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SaidasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Saida>>> GetSaidas()
        {
            return await _context.Saidas.Include(s => s.Mercadoria).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Saida>> GetSaida(int id)
        {
            var saida = await _context.Saidas.Include(s => s.Mercadoria).FirstOrDefaultAsync(s => s.Id == id);

            if (saida == null)
            {
                return NotFound();
            }

            return saida;
        }

        [HttpPost]
        public async Task<ActionResult<Saida>> PostSaida(Saida saida)
        {
            _context.Saidas.Add(saida);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaida", new { id = saida.Id }, saida);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaida(int id, Saida saida)
        {
            if (id != saida.Id)
            {
                return BadRequest();
            }

            _context.Entry(saida).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaidaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaida(int id)
        {
            var saida = await _context.Saidas.FindAsync(id);
            if (saida == null)
            {
                return NotFound();
            }

            _context.Saidas.Remove(saida);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaidaExists(int id)
        {
            return _context.Saidas.Any(s => s.Id == id);
        }
    }
}
