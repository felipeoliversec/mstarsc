using System.ComponentModel.DataAnnotations;

namespace MStarSupply.Models
{
    public class Mercadoria
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string NumeroRegistro { get; set; }

        [Required]
        public string Fabricante { get; set; }

        [Required]
        public string Tipo { get; set; }

        public string Descricao { get; set; }
    }
}
