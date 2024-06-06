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
    public class MercadoriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MercadoriasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mercadoria>>> GetMercadorias()
        {
            return await _context.Mercadorias.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Mercadoria>> GetMercadoria(int id)
        {
            var mercadoria = await _context.Mercadorias.FindAsync(id);

            if (mercadoria == null)
            {
                return NotFound();
            }

            return mercadoria;
        }

        [HttpPost]
        public async Task<ActionResult<Mercadoria>> PostMercadoria(Mercadoria mercadoria)
        {
            _context.Mercadorias.Add(mercadoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMercadoria", new { id = mercadoria.Id }, mercadoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMercadoria(int id, Mercadoria mercadoria)
        {
            if (id != mercadoria.Id)
            {
                return BadRequest();
            }

            _context.Entry(mercadoria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MercadoriaExists(id))
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
        public async Task<IActionResult> DeleteMercadoria(int id)
        {
            var mercadoria = await _context.Mercadorias.FindAsync(id);
            if (mercadoria == null)
            {
                return NotFound();
            }

            _context.Mercadorias.Remove(mercadoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MercadoriaExists(int id)
        {
            return _context.Mercadorias.Any(e => e.Id == id);
        }
    }
}
