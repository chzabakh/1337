/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_tools.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/28 16:35:08 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/19 19:08:01 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

void	ft_boarddel(char **board, char ***ctab2, int *ltab)
{
	int		i;
	int		j;

	i = 0;
	while (board[i])
	{
		free(board[i]);
		i++;
	}
	free(board);
	free(ltab);
	i = 0;
	while (ctab2[i])
	{
		j = 0;
		while (ctab2[i][j])
		{
			free(ctab2[i][j]);
			j++;
		}
		free(ctab2[i]);
		i++;
	}
	free(ctab2);
}

int		ft_hex(char *s)
{
	char	*color;
	int		len;
	int		i;
	int		dcode;

	i = -1;
	dcode = 0;
	color = ft_strstr(s, "0x");
	if (color == NULL)
		return (0);
	color = color + 2;
	len = ft_strlen(color);
	while (color[++i] != '\0' && len > 0)
	{
		if (color[i] >= 'A' && color[i] <= 'F')
			dcode = dcode + ((color[i] - 55) * pow(16, (len - 1)));
		else if (color[i] >= 'a' && color[i] <= 'f')
			dcode = dcode + ((color[i] - 87) * pow(16, (len - 1)));
		else if (color[i] >= '0' && color[i] <= '9')
			dcode = dcode + ((color[i] - 48) * pow(16, (len - 1)));
		else
			return (0);
		len--;
	}
	return (dcode);
}

void	ft_init(t_mlx *m)
{
	if ((m->min * m->l) <= 300)
	{
		m->dim = 1000;
		m->dist = 30;
	}
	else if ((m->min * m->l) < 500)
	{
		m->dim = 1500;
		m->dist = 20;
	}
	else if ((m->min * m->l) < 1000)
	{
		m->dim = 1400;
		m->dist = 15;
	}
	else if ((m->min * m->l) >= 1000)
	{
		m->dim = 1300;
		m->dist = 1;
	}
	m->mlx_ptr = mlx_init();
	m->win_ptr = mlx_new_window(m->mlx_ptr, m->dim, m->dim, "fdf");
}

int		keypress(int keycode, void *m)
{
	t_mlx	*m2;

	m2 = (t_mlx*)m;
	if (keycode == 53 && m)
	{
		system("clear");
		exit(0);
	}
	if (keycode == 123)
		m2->arwj = m2->arwj - 10;
	if (keycode == 124)
		m2->arwj = m2->arwj + 10;
	if (keycode == 125)
		m2->arwi = m2->arwi + 10;
	if (keycode == 126)
		m2->arwi = m2->arwi - 10;
	if (keycode == 69)
		m2->dist++;
	if (keycode == 78 && (m2->dist - 2 > 0))
		m2->dist--;
	mlx_clear_window(m2->mlx_ptr, m2->win_ptr);
	ft_draw(m2);
	return (0);
}

int		keypressiso(int keycode, void *m)
{
	t_mlx	*m2;

	m2 = (t_mlx*)m;
	if (keycode == 53 && m)
	{
		system("clear");
		exit(0);
	}
	if (keycode == 123)
		m2->arwj = m2->arwj - 10;
	if (keycode == 124)
		m2->arwj = m2->arwj + 10;
	if (keycode == 125)
		m2->arwi = m2->arwi + 10;
	if (keycode == 126)
		m2->arwi = m2->arwi - 10;
	if (keycode == 69)
		m2->dist++;
	if (keycode == 78 && (m2->dist - 1 > 0))
		m2->dist--;
	mlx_clear_window(m2->mlx_ptr, m2->win_ptr);
	ft_drawiso(m2);
	return (0);
}
