using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MStarSupply.Models
{
    public class Entrada
    {
        public int Id { get; set; }

        [Required]
        public int Quantidade { get; set; }

        [Required]
        public DateTime DataHora { get; set; }

        [Required]
        public string Local { get; set; }

        [ForeignKey("Mercadoria")]
        public int MercadoriaId { get; set; }

        public Mercadoria Mercadoria { get; set; }
    }
}
