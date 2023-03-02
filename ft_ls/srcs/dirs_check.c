/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   dirs_check.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/07 14:29:07 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/04 20:42:04 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	create_dirnms(t_ls *ls, int *tab)
{
	int		i;

	i = 0;
	if (ls->args.argdircnt)
		ls->args.argdirsnms = (char **)malloc(sizeof(char *) * \
				(ls->args.argdircnt + 1));
	while (i < ls->args.argdircnt)
	{
		ls->args.argdirsnms[i] = (char *)malloc(sizeof(char) * (tab[i] + 1));
		i++;
	}
	if (ls->args.argdircnt)
		ls->args.argdirsnms[i] = NULL;
}

void	ls_init(t_ls *ls)
{
	ls->args.argdircnt = 0;
	ls->err_status = 0;
	ls->args.flags = (t_flags){0, 0, 0, 0};
	ls->total = 0;
	ls->htotal = 0;
	ls->args.argdirsnms = NULL;
}

int	*args_check(int *i, int argc, char **argv, t_ls *ls)
{
	while (*i < argc)
	{
		if (argv[*i][0] != '-')
			ls->args.argdircnt++;
		else
			flags_check(argv[*i], ls);
		*i = *i + 1;
	}
	*i = 1;
	return ((int *)malloc(sizeof(int) * ls->args.argdircnt));
}

void	fill_dirnms(t_ij z, int argc, char **argv, t_ls *ls)
{
	z = (t_ij){1, 0};
	while (z.i < argc)
	{
		if (argv[z.i][0] != '-')
		{
			ls->args.argdirsnms[z.j] = ft_strcpy(ls->args.argdirsnms[z.j], \
					argv[z.i]);
			z.j++;
		}
		z.i++;
	}
}

void	dirs_check(t_ls *ls, char **argv, int argc)
{
	int		*tab;
	t_ij	z;

	z = (t_ij){1, 0};
	tab = NULL;
	ls_init(ls);
	tab = args_check(&z.i, argc, argv, ls);
	while (z.i < argc)
	{
		if (argv[z.i][0] != '-')
		{
			tab[z.j] = ft_strlen(argv[z.i]);
			z.j++;
		}
		z.i++;
	}
	create_dirnms(ls, tab);
	free(tab);
	fill_dirnms(z, argc, argv, ls);
	sort_dirnms(ls, ls->args.argdircnt);
}
